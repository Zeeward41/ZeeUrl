resource "local_file" "dns_instance_Jenkins" {
    content= aws_instance.jenkins_public_server.public_dns
    filename = "dns_instance_jenkins.txt"
}

resource "local_file" "dns_instance_SonarQube" {
    content= aws_instance.sonarQube_public_server.public_dns
    filename = "dns_instance_sonarqube.txt"
}

resource "local_file" "private_key" {
    content = tls_private_key.ssh_key.private_key_pem
    filename = "la_clef_private.pem"
}

