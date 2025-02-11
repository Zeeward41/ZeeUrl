
# Create a certificate
resource "aws_acm_certificate" "zeeurl_acm" {
  domain_name       = var.web_site
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# Validation certificate
resource "aws_acm_certificate_validation" "zeeurl_cert_validate" {
  certificate_arn         = aws_acm_certificate.zeeurl_acm.arn
  validation_record_fqdns = [for record in aws_route53_record.zeeurl_cert_dns : record.fqdn]

  timeouts {
    create = "15m"
  }
}