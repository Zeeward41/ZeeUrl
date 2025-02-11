# Provider global

provider "aws" {
    alias = "global"
    region = "us-east-1"
} 


# Create a certificate
resource "aws_acm_certificate" "zeeurl_acm" {
  domain_name       = var.web_site
  validation_method = "DNS"

  //certificate must be in global region
  provider = aws.global

  lifecycle {
    create_before_destroy = true
  }
}

# Validation certificate

resource "aws_acm_certificate_validation" "zeeurl_cert_validate" {
  provider                = aws.global
  certificate_arn         = aws_acm_certificate.zeeurl_acm.arn
  validation_record_fqdns = [aws_route53_record.zeeurl_cert_dns.fqdn]
}