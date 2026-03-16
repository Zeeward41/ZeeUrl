# Initial Manual Setup of Jenkins (First Run – ZeeURL)

For my very first DevOps project, I configured Jenkins manually to deeply understand each component.  
Here are the detailed steps with screenshots.

## Initial Setup

Access Jenkins via the server's public IP on port 8080.
AWS -> EC2 -> Jenkins Server -> Public IPv4 address

![Image - IP jenkins Server](images/2026-03-16-14-20-33.png)

![Image - Jenkins Start](images/2026-03-16-14-22-45.png)

Once inside `Jenkins`, we start by creating the pipeline for the Express server (backend).

![Image - Welcome to jenkins](images/2026-03-16-14-51-23.png)

![Image - creation pipeline Backend](images/2026-03-16-14-55-03.png)

![Image - discard old builds](images/2026-03-16-14-55-49.png)

We need to create a `credential` so `Jenkins` can access our `GitHub repository`.  
To do this, we will generate an `SSH key` dedicated to Jenkins`.

![Image - Creation SSH-key](images/2026-03-16-15-00-30.png)

Next, retrieve the public key and add it to `GitHub` (in the Deploy keys section).

![Image - deploy keys on github](images/2026-03-16-15-05-28.png)

Then simply add the private key to `Jenkins`.

![Image - credentials](images/2026-03-16-15-07-40.png)

![Image - system](images/2026-03-16-15-08-04.png)

![Image - global](images/2026-03-16-15-08-20.png)

![Image - Add credentials](images/2026-03-16-15-08-52.png)

![Image - Create](images/2026-03-16-15-09-58.png)

##### (If you protected the key with a passphrase, enter it in the Passphrase field.)

Next, tell Jenkins to accept first-time Git host connections…  
Dashboard → Manage Jenkins → Configure Global Security → Git Host Key Verification Configuration → **Accept first connection**.

![Image - Accept first connection](images/2026-03-16-15-11-52.png)

Now create the first pipeline step.

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

##### Important: the `credentialsId` must exactly match the name created in the credentials step (github_private_key).

Run the pipeline to verify everything works.

![Image - build 1 works](images/2026-03-16-15-18-55.png)

## Installing Dependencies

### NPM

We need NPM to install project dependencies.
Install the `NodeJS` plugin.

![Image - NodeJS plugin](images/2026-03-16-15-22-05.png)

Once installed, configure it under Manage Jenkins → Tools.

![Image - NodeJS](images/2026-03-16-15-23-44.png)

Then add the dependency installation step to the pipeline script.

![Image - NodeJS script](images/2026-03-16-15-25-57.png)

### Unit Tests

Configure the unit tests step.

![Image - Unit Tests](images/2026-03-16-15-26-23.png)

### Trivy

Next, we scan files using Trivy.
First, install Trivy on the Jenkins server:`https://trivy.dev/docs/latest/getting-started/installation/`

```bash
sudo apt-get install wget gnupg
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | gpg --dearmor | sudo tee /usr/share/keyrings/trivy.gpg > /dev/null
echo "deb [signed-by=/usr/share/keyrings/trivy.gpg] https://aquasecurity.github.io/trivy-repo/deb generic main" | sudo tee -a /etc/apt/sources.list.d/trivy.list
sudo apt-get update
sudo apt-get install trivy
```

Verify installation: trivy --version

Then configure the scan in the pipeline script.

![Image - Trivy](images/2026-03-16-15-30-32.png)

Run the pipeline.

![Image - build 2 works](images/2026-03-16-15-35-22.png)

Pipeline reports are located in: `/var/lib/jenkins/workspace/<pipeline_name>/`
Look for the file trivy-fs-backend-report.html (or similar).

![Image - trivy scan](images/2026-03-16-15-36-25.png)

### SonarQube

You need to create an `access token` and install the SonarQube plugin in Jenkins.
The plugin performs the analysis and sends the report to the SonarQube server.

![Image - SonarQube Scanner Plugin](images/2026-03-16-15-39-08.png)

Configure it under Manage Jenkins → Tools.

![Image - SonarQube configuration in Jenkins](images/2026-03-16-15-40-18.png)

#### On the SonarQube server

(IP of the server with port `9000` – login admin / admin)

![Image - SonarQube token 1](images/2026-03-16-15-44-16.png)
![Image - SonarQube 2](images/2026-03-16-15-44-38.png)
![Image - SonarQube 3](images/2026-03-16-15-44-55.png)

#### On the Jenkins server

Create a new `credential`:
Credentials → System → Global → Add credentials

![Image - Secret Text](images/2026-03-16-15-46-44.png)
![Image - Create credential](images/2026-03-16-15-48-36.png)

Then tell `Jenkins` to use this credential to connect to the SonarQube server, and provide the server IP.
Under `System`:

![Image - SonarQube servers](images/2026-03-16-15-50-31.png)

##### important: use `http://sonarQube_ip:9000`

Now add the SonarQube scan step to the pipeline.

![Image - script pipeline](images/2026-03-16-15-52-09.png)

Do not run the pipeline yet — we still need to configure Code Quality first.

## Code Quality

#### On the SonarQube server

![Image - Code Quality 1](images/2026-03-16-16-07-38.png)
![Image - Code Quality 2](images/2026-03-16-16-07-55.png)

#### On the Jenkins server

Add the corresponding step to the pipeline script.

![Image - Code Quality 3](images/2026-03-16-16-09-25.png)

Test the pipeline.

![Image - build works](images/2026-03-16-16-20-00.png)

On the SonarQube server, go to Projects.

![Image - sonarQube scan](images/2026-03-16-16-06-28.png)

## OWASP Dependency Check

(Documentation: `https://www.jenkins.io/doc/pipeline/steps/dependency-check-jenkins-plugin/`)
Start by installing and configuring the plugin.

![Image - OWASP](images/2026-03-16-16-21-14.png)

Under Tools.

![Image - Configuration plugin OWASP](images/2026-03-16-16-22-20.png)

#### RECOMMENDATION

It is strongly recommended to use an `NVD API Key`, otherwise the download is extremely slow.
Go to: `https://nvd.nist.gov/developers/request-an-api-key`
Obtain a key, then create a credential in Jenkins.

![Image - secret Text](images/2026-03-16-16-49-47.png)
![Image - Create Credential](images/2026-03-16-16-50-29.png)

Add the OWASP Dependency-Check stage to the pipeline:

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

After the build, you get the report:

![Image - Result OWASP](images/2026-03-16-16-52-24.png)

## Docker

Install the Docker and Docker Pipeline plugins.

![Image - Dcoker plugins](images/2026-03-16-16-54-13.png)

Then configure Docker in Jenkins.

![Image - Docker config](images/2026-03-16-16-55-21.png)

Create a credential for Docker Hub.

##### Important: the username must be lowercase (even if your Docker Hub account has uppercase letters).

![Image - username with password](images/2026-03-16-16-57-16.png)
![Image - Create credential](images/2026-03-16-16-58-56.png)

Add the build & tag stage:

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

Scan the newly built image with Trivy.
Reports are located in `/var/lib/jenkins/workspace/<pipeline_name>/`

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

Finally, push the image to the Docker Hub repository:

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

The `backend` pipeline is now complete.
Repeat the same operations for the `frontend` and `range-server`.

Once these steps are done, Jenkins is fully operational and ready to run pipelines.
The server remains online for subsequent builds.
