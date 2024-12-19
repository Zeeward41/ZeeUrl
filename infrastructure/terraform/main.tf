provider "aws" {
  region = var.region

  default_tags {
    tags = {
      Creator = var.name
      Project = var.project_name
      Env     = var.environment
    }
  }

}