# Build
docker build -t moroccanoutlaws/spa:latest .

# Push
docker push moroccanoutlaws/spa:latest

# Connect to server
# Pull
# Tag
# Deploy
ssh root@moroccanoutlaws.com "docker pull moroccanoutlaws/spa:latest; docker tag moroccanoutlaws/spa:latest dokku/spa:latest; dokku deploy spa latest"
