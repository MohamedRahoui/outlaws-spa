# Build
docker build -t moroccanoutlaws/spa:latest .

# Push
docker push moroccanoutlaws/spa:latest

# Connect to server
# Pull
# Tag
# Deploy
ssh root@front.moroccanoutlaws.com "docker pull moroccanoutlaws/spa:latest; dokku git:from-image spa moroccanoutlaws/spa:latest"
