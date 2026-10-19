.PHONY: up down verify
up:
	docker compose up --build
down:
	docker compose down --volumes
verify:
	curl --fail http://localhost:3000/health
