FROM denoland/deno:1.34.3

EXPOSE 3000
WORKDIR /app/server

CMD ["deno", "run", "-A", "--unstable", "app.ts"]
