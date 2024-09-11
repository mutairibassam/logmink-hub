start:
	docker compose -f compose.yaml up -d

restart:
	docker compose down && docker compose -f compose.yaml up -d

refresh:
	docker compose down -v && docker compose -f compose.yaml up -d

stop:
	docker container stop mongo.logmink.hub
	docker container stop express.logmink.hub
	docker container stop logmink.hub

delete:
	docker compose down -v

# used to deploy single unit of compose file
deploy-hub:
	docker compose down -v logmink.hub
	docker compose up -d logmink.hub