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

resource "local_file" "ip_jenkins_server" {
    content =   aws_instance.jenkins_public_server.public_ip
    filename = "ip_jenkins_server.txt"
}

resource "local_file" "ip_sonarQube_server" {
    content =   aws_instance.sonarQube_public_server.public_ip
    filename = "ip_sonarQube_server.txt"
}

resource "local_file" "group_name_jenkins_SG" {
    content = aws_security_group.jenkins.name 
    filename = "group_name_jenkins_SG.txt"
}

resource "local_file" "group_name_sonarQube_SG" {
    content = aws_security_group.sonarQube.name
    filename = "group_name_sonarQube_SG.txt"
}
