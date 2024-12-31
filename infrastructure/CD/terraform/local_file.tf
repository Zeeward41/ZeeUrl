resource "local_file" "private_key" {
    content = tls_private_key.ssh_key.private_key_pem
    filename = "private_key.pem"
}

# resource "local_file" "master_ip" {
#     content =   aws_instance.master_kubernetes.public_ip 
#     filename = "master_ip.txt"
# }
resource "local_file" "dns_master" {
    content =   aws_instance.master_kubernetes.public_dns 
    filename = "dns_master.txt"
}
resource "local_file" "dns_node_one" {
    content =   aws_instance.node_one_kubernetes.public_dns 
    filename = "dns_node1.txt"
}
resource "local_file" "dns_node_two" {
    content =   aws_instance.node_two_kubernetes.public_dns 
    filename = "dns_node2.txt"
}

resource "local_file" "sg_kubernetes_name" {
    content = aws_security_group.kubernetes_servers.name
    filename = "sg_kubernetes_name.txt"
}