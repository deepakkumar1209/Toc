render_yaml_content = """
services:
  - type: web
    name: regex-backend
    env: docker
    dockerfilePath: ./Dockerfile
    plan: free
"""

with open("render.yaml", "w") as f:
    f.write(render_yaml_content.strip())

print("✅ render.yaml created successfully.")
