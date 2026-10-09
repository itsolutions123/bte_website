# BUGLOG
- 2026-10-09: Fixed 404 error on direct navigation/reload of router paths (e.g., /home) by adding `default.conf` to Nginx with `try_files $uri $uri/ /index.html;` fallback, and mounting it via compose.yaml.
