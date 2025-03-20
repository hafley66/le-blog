# Start with a Go base image for building the server
FROM golang:alpine AS builder

# Set necessary environment variables
ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

# Install git and build tools
RUN apk --no-cache add git build-base

# Install D2 by cloning its repo and building it
RUN git clone https://github.com/terrastruct/d2.git /d2 && \
    cd /d2 && \
    go build -o /usr/local/bin/d2

# Create the working directory for the Go app
WORKDIR /src

# Copy the Go project files
COPY . .

# Build the Go server
RUN go build -o /server .

# Start a new stage for a smaller production image
FROM alpine:latest

# Install necessary CA certificates
RUN apk --no-cache add ca-certificates

# Copy the D2 binary from the previous stage
COPY --from=builder /usr/local/bin/d2 /usr/local/bin/d2

# Copy the compiled server from the previous stage
COPY --from=builder /server /server

# Expose the port the app runs on
EXPOSE 8080

# Command to run the executable
ENTRYPOINT ["/server"]
