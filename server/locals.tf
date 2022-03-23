locals {
  development_settings = {
    maxScale : "5",
    minScale : "0",
    maxMemory : "256Mi",
    maxCPU : "1000m",
    containerConcurrency : 60,
    timeoutSeconds : 600,
  }

  production_settings = {
    maxScale : "5",
    minScale : "0",
    maxMemory : "256Mi",
    maxCPU : "1000m",
    containerConcurrency : 80,
    timeoutSeconds : 300,
  }
}

locals {
  settings = var.NODE_ENV != "production" ? local.development_settings : local.production_settings
}
