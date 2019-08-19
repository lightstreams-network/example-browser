REGISTRY_URL = registry.lightstreams.io
SSHKEY = ${HOME}/.ssh/id_rsa
DOCKERFILE = "Dockerfile"
IMAGE_NAME = "demo-browser"
IMAGE_VERSION = "latest"

define SSH_PRIV_KEY
$(shell cat $(SSHKEY) | sed '$$d' | tail -n +2)
endef

build-demo-browser-image:
	@echo "Build docker image"
	docker build -t $(REGISTRY_URL)/$(IMAGE_NAME):$(IMAGE_VERSION) -f $(DOCKERFILE) --no-cache \
		--build-arg ssh_prv_key="$(SSH_PRIV_KEY)" .

publish-demo-browser-image:
	@echo "Publish docker image"
	docker push $(REGISTRY_URL)/$(IMAGE_NAME):$(IMAGE_VERSION)
