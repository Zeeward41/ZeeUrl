terraform {
  backend "s3" {
    bucket = "zeeurl-backend-41"
    region = "eu-north-1"
    key    = "CD/terraform.tfstate"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.72.1"
    }

    tls = {
      source  = "hashicorp/tls"
      version = "4.0.6"
    }

    local = {
      source  = "hashicorp/local"
      version = "2.5.2"
    }

  }
}
