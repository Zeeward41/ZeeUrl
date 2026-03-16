# Configuration manuelle initiale de Jenkins (premier run – ZeeURL)

Pour mon premier projet DevOps, j’ai configuré Jenkins manuellement afin de bien comprendre chaque composant.
Voici les étapes détaillées avec screenshots.

## Mise en place

On se rend sur l'IP du server ainsi que sur le port 8080 (jenkins).
AWS -> EC2 -> Jenkins Server -> Public IPv4 address

![Image - IP jenkins Server](images/2026-03-16-14-20-33.png)

![Image - Jenkins Start](images/2026-03-16-14-22-45.png)

Une fois dans Jenkins, on commence par faire le pipeline pour le server Express (backend)

![Image - Welcome to jenkins](images/2026-03-16-14-51-23.png)

![Image - creation pipeline Backend](images/2026-03-16-14-55-03.png)

![Image - discard old builds](images/2026-03-16-14-55-49.png)

Il faut créer un credential pour que `jenkins` puisse accéder à notre `Github Repo`.
Pour cela on va créer un `SSH-key` pour Jenkins.

![Image - Creation SSH-key](images/2026-03-16-15-00-30.png)

Ensuite on récupère la clef public que l'on va mettre dans `github`.

![Image - deploy keys on github](images/2026-03-16-15-05-28.png)

Ensuite il suffit d'ajouter la clef privé dans `jenkins`.

![Image - credentials](images/2026-03-16-15-07-40.png)

![Image - system](images/2026-03-16-15-08-04.png)

![Image - global](images/2026-03-16-15-08-20.png)

![Image - Add credentials](images/2026-03-16-15-08-52.png)

![Image - Create](images/2026-03-16-15-09-58.png)

##### (Si on a utilisé un mot de passe pour la clé, il faut le mettre dans le champ Passphrase.)

Il faut ensuite spécifié à Jenkins d'autoriser les premières connexions...

Dashboard -> Manage Jenkins -> Configure Global Security -> Git Host Key Verification Configuration -> Accept first connection.

![Image - Accept first connection](images/2026-03-16-15-11-52.png)

Ensuite on créer la première étape de notre pipeline.

```groovy
pipeline {
    agent any

    stages {
        stage('Git Checkout') {
            steps {
                git credentialsId: 'github_private_key', url: 'git@github.com:Zeeward41/ZeeUrl.git'
            }
        }

}
}
```

##### Attention, git `credentialsId` doit correspondre exactement au nom créé dans l’étape des credentials (github_private_key).

On Lance ensuite le pipeline pour voir que tous fonctionne.

![Image - build 1 works](images/2026-03-16-15-18-55.png)

## Installation dépendances

### NPM

On à besoin de NPM pour installer les dépendances du projets.
On installe donc le plugin `NodeJS`

![Image - NodeJS plugin](images/2026-03-16-15-22-05.png)

Une fois l'installation réalisé, on configure celui-ci.
Dans `Tools`

![Image - NodeJS](images/2026-03-16-15-23-44.png)

Puis on configure l'installation des dépendances dans le script du pipeline.

![Image - NodeJS script](images/2026-03-16-15-25-57.png)

### Unit Tests

On configure les Unit Tests.

![Image - Unit Tests](images/2026-03-16-15-26-23.png)

### Trivy

Ensuite on va scanner les fichiers via Trivy.

Il faut avant cela l'installer sur le server Jenkins. `https://trivy.dev/docs/latest/getting-started/installation/`

```bash
sudo apt-get install wget gnupg
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | gpg --dearmor | sudo tee /usr/share/keyrings/trivy.gpg > /dev/null
echo "deb [signed-by=/usr/share/keyrings/trivy.gpg] https://aquasecurity.github.io/trivy-repo/deb generic main" | sudo tee -a /etc/apt/sources.list.d/trivy.list
sudo apt-get update
sudo apt-get install trivy
```

Puis on check l'installation via `trivy --version`

On configure le scan dans le script du pipeline.

![Image - Trivy](images/2026-03-16-15-30-32.png)

On lance le pipeline.

![Image - build 2 works](images/2026-03-16-15-35-22.png)

Les éléments, rapports d'un pipeline dans `jenkins` se trouve dans `/var/lib/jenkins/workspace/<pipeline_name>/`

On cherche le fichier `trivy-fs-backend-report.html`

![Image - trivy scan](images/2026-03-16-15-36-25.png)

### SonarQube

Il faut pour cela créer un `Token d'accès` et ajouter le plugin de sonarQube dans Jenkins.
Le plugin permet de faire une analyse et un report qui sont ensuite envoyé au server SonarQube

![Image - SonarQube Scanner Plugin](images/2026-03-16-15-39-08.png)

On configure dans Jenkins ->> Tools.

![Image - SonarQube configuration in Jenkins](images/2026-03-16-15-40-18.png)

#### Sur le server SonarQube

IP du server avec le port `9000` (admin / admin)

![Image - SonarQube token 1](images/2026-03-16-15-44-16.png)
![Image - SonarQube 2](images/2026-03-16-15-44-38.png)
![Image - SonarQube 3](images/2026-03-16-15-44-55.png)

#### Sur le server Jenkins

On créer un nouveau `credential`. Credentials -> system -> global -> Add credentials

![Image - Secret Text](images/2026-03-16-15-46-44.png)
![Image - Create credential](images/2026-03-16-15-48-36.png)

Ensuite il faut indiquer à `Jenkins` qu'il doit utiliser se credential pour se connecté au server SonarQube,
ainsi que l'IP du server.

Dans `System`

![Image - SonarQube servers](images/2026-03-16-15-50-31.png)

##### ATTENTION: il faut mettre `http://ip_sonarQube:9000`

Puis on créer notre scan de sonarQube dans notre pipeline

![Image - script pipeline](images/2026-03-16-15-52-09.png)

Ne pas lancer le pipeline maintenant, car il faut configurer le Code quality avant.

## Code Quality

#### Sur le server SonarQube

Pour cela sur le server SonarQube

![Image - Code Quality 1](images/2026-03-16-16-07-38.png)
![Image - Code Quality 2](images/2026-03-16-16-07-55.png)

#### Sur le server Jenkins

On ajoute ensuite l'étape dans le script du pipeline.

![Image - Code Quality 3](images/2026-03-16-16-09-25.png)

On test le pipeline.

![Image - build works](images/2026-03-16-16-20-00.png)

Sur le server `SonarQube`. On va dans Project.

![Image - sonarQube scan](images/2026-03-16-16-06-28.png)

## OWASP Dependency Check

(les commandes : `https://www.jenkins.io/doc/pipeline/steps/dependency-check-jenkins-plugin/`)

On Commence par installer et configurer le plugin

![Image - OWASP](images/2026-03-16-16-21-14.png)

Dans Tools.

![Image - Configuration plugin OWASP](images/2026-03-16-16-22-20.png)

#### RECOMMENDATION

Il est recommandé d'utiliser une NVD API car sinon le téléchargement est extrêmement long...
Aller sur le site : `https://nvd.nist.gov/developers/request-an-api-key`

Obtenir une `nvdApiKey` puis créer un credential dans jenkins.

On créer un nouveau `credential`. Credentials -> system -> global -> Add credentials
![Image - secret Text](images/2026-03-16-16-49-47.png)
![Image - Create Credential](images/2026-03-16-16-50-29.png)

Ensuite on ajoute l'étape du OWASP Dependency Check dans le pipeline.

```groovy
stage('OWASP Dependency Check') {
    steps {
        withCredentials([string(credentialsId: 'nvd-api-key', variable: 'NVD_API_KEY')]) {
            dir('backend') {
                dependencyCheck(
                    additionalArguments: "--scan ./ --nvdApiKey ${NVD_API_KEY}",
                    odcInstallation: 'OWASP-DC'
                )
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }
    }
}
```

Après le build, on obtient le rapport :

![Image - Result OWASP](images/2026-03-16-16-52-24.png)

## Docker

On commence par installer les plugins `Docker` et `Docker pipeline`
![Image - Dcoker plugins](images/2026-03-16-16-54-13.png)

On configure ensuite `Docker` dans `jenkins`

![Image - Docker config](images/2026-03-16-16-55-21.png)

Il faut ensuite créer un `credential` pour dockerHub

##### ATTENTION l’utilisateur doit être en minuscule (même si ton compte Docker Hub a une majuscule).

![Image - username with password](images/2026-03-16-16-57-16.png)
![Image - Create credential](images/2026-03-16-16-58-56.png)

Puis le pipeline

```groovy
stage('Build and Tag Docker Image') {
            steps {
                dir('backend') {
                    script {
                        withDockerRegistry(credentialsId: 'dockerHub-cred', toolName: 'docker') {
                            sh "docker build -t zeeward41/test:backend_v1 ."
                        }
                    }
                }
            }
        }
```

## Trivy Image Scan

On scan ensuite l'image que l'on vient de créer avec Docker
le rapport se trouve dans `/var/lib/jenkins/workspace/<pipeline_name>/`

```groovy
stage('Docker Image Scan') {
            steps {
                dir('backend') {
                    sh 'trivy image --format table -o trivy-image-backend-report.html zeeward41/test:backend_v1'
                }
            }
        }

```

## Docker

Puis il ne reste plus qu'a Push l'image sur le repo `DockerHub`

```groovy
stage('Push Docker Image') {
    steps {
            dir('backend') {
                script {
                    withDockerRegistry(credentialsId: 'dockerHub-cred', toolName: 'docker') {
                            sh "docker push zeeward41/test:backend_v1"
                    }
                }
            }
        }
    }
```

![Image - DockerHub](images/2026-03-16-17-02-48.png)

Le pipeline pour le `backend` est terminé.
On répète les même opération pour le `frontend` et le `range-server`.

Une fois ces étapes réalisées, Jenkins est opérationnel et prêt à exécuter des pipelines. Le serveur reste en ligne pour les builds suivants.
