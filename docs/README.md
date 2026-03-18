# ZeeURL – URL Shortener "Production-Grade" (DEMO)

[![CI Status](https://github.com/Zeeward41/ZeeUrl/actions/workflows/create_servers_kubernetes.yaml/badge.svg)](https://github.com/Zeeward41/ZeeUrl/actions)

![Architecture ZeeURL](docs/diagram.png)

Full-stack + DevOps project: a complete, self-hosted URL shortener with visit tracking (total + unique), user dashboard, and GitOps deployment on Kubernetes.

**TL;DR**  
ZeeURL is a production-grade URL shortener designed to demonstrate end-to-end DevOps practices (CI/CD, GitOps, IaC) and scalable system design.  
The focus is on infrastructure, automation, and reliability rather than feature complexity.

Inspired by [t.ly](https://t.ly) design.  
License: [Apache 2.0](LICENSE)

---

## Tech Stack

| Layer           | Main Technologies                                                                       |
| --------------- | --------------------------------------------------------------------------------------- |
| Frontend        | React 18 • Vite • React Router • Context API • CSS modules                              |
| Backend         | Node.js 20 • Express • Mongoose • express-validator • bcryptjs • async-mutex            |
| ID Distribution | Range-based ID allocation service (concurrency-controlled, avoids DB contention)        |
| Database        | MongoDB 8 • Daily backup to S3 (Kubernetes CronJob)                                     |
| Infrastructure  | AWS (EC2 • ALB • Route 53 • ACM) • Terraform IaC                                        |
| Orchestration   | Kubernetes (kubeadm 1.32) • 1 control-plane + 2 workers • NGINX Ingress                 |
| GitOps / CD     | ArgoCD (declarative deployments + drift detection)                                      |
| CI              | GitHub Actions + Jenkins (hybrid CI approach)                                           |
| Monitoring      | Prometheus + Grafana                                                                    |
| Security        | Kubernetes Secrets • Docker Hub pull secret • Trivy FS/Image • OWASP DC • non-root pods |

---

## Architecture Decisions

### ID Generation (Range Server)

A dedicated range-server is used to:

- Avoid database contention on ID generation
- Enable horizontal scaling of backend instances
- Decouple ID allocation from the database layer

This simplified implementation uses a fixed range strategy to demonstrate distributed ID generation and concurrency control.

---

### Database Choice (MongoDB)

MongoDB was chosen for simplicity and fast iteration, using a widely adopted stack (MERN).

The focus of the project is on infrastructure and DevOps practices rather than database-specific optimizations.

---

### Service Separation

The system is split into multiple services (frontend, backend, range-server) to:

- Isolate failures and simplify debugging
- Follow single-responsibility principles
- Enable independent scaling of components

---

### Kubernetes

Kubernetes is used to simulate a production-like environment with:

- Self-healing containers
- Horizontal scaling
- Rolling deployments

While it may be overkill for a simple URL shortener, it provides hands-on experience with real-world orchestration challenges.

---

### GitOps with ArgoCD

ArgoCD is used to:

- Enforce declarative deployments
- Detect configuration drift
- Improve deployment traceability

---

### CI Strategy

The project combines GitHub Actions and Jenkins to explore different CI approaches:

- GitHub Actions for lightweight workflows
- Jenkins for more advanced, self-hosted pipeline scenarios

---

## Key Features

- Short alias generation (random base62 or custom)
- Visit tracking (total + unique visitors on 24h rolling window)
- Per-link statistics (daily / weekly / monthly averages)
- User dashboard with edit/delete
- Daily MongoDB backup to S3

---

## How to Explore / Understand the Project

🆕 This project is designed to demonstrate production-oriented DevOps practices.  
It is **not intended for simple local deployment** (requires cloud infrastructure, secrets, and Kubernetes setup).

To understand how it works:

1. Check the architecture diagram above
2. Review CI pipelines: `.github/workflows/` + `infrastructure/CI/jenkins/*`
3. Review ArgoCD & Kubernetes manifests: `infrastructure/CD/kubernetes/`
4. Review Ansible playbooks: `infrastructure/CD/ansible/`
5. Review Terraform (CI + CD): `infrastructure/CI/terraform/` and `infrastructure/CD/terraform/`
6. **Manual initial Jenkins setup** (CI servers stay online) → `docs/jenkins-setup-EN.md`

---

## Technical Improvements (Roadmap to Production)

### Code Quality

- Apply React best practices for cleaner, more maintainable components
- Organize CSS more efficiently (CSS modules + utility-first approach)

### System Resilience

- Deploy redundant CI: 2 Jenkins + 2 SonarQube instances
- HA Kubernetes: 3 controlplane nodes + 4+ workers, multi-AZ / multi-region
- Database: multi-AZ MongoDB or Aurora / Atlas clustering

### Security & Access

- Replace SSH with AWS Session Manager (audit + no keys)

### Performance

- Add Redis cache for frequent redirections and stats aggregation

### Observability

- Add application-level metrics via Prometheus (latency, error rates, visit counters)

### Security Best Practices

- Least-privilege IAM policies
- Kubernetes NetworkPolicies to restrict pod-to-pod traffic

---

## Project Scope

This is a learning-oriented project simulating production-grade practices, not a fully hardened enterprise system.

---

**Personal note**  
100% solo project realized during my career transition (2024–2025).  
AWS Certified Solutions Architect – Associate.  
Fully self-taught (Terraform, Ansible, Kubernetes, ArgoCD, Jenkins, GitOps).
