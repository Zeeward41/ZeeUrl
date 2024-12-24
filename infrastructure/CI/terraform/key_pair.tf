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

