# Générer une clé SSH
resource "tls_private_key" "ssh_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

# Créer une ressource de clé AWS
resource "aws_key_pair" "key_ci_Zeeurl" {
  key_name   = "key_ci_Zeeurl"
  public_key = tls_private_key.ssh_key.public_key_openssh
}

resource "local_file" "dns_instance" {
    content= aws_instance.jenkins_public_server.public_dns
    filename = "dns_instance.txt"
}

resource "local_file" "private_key" {
    content = tls_private_key.ssh_key.private_key_pem
    filename = "la_clef_private.pem"
}

