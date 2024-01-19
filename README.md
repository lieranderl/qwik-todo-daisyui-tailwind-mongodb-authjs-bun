# Qwik-Todo-DaisyUI-Tailwind-MongoDB-AuthJS-Bun Project

This project is a Todo application built with Qwik, DaisyUI, Tailwind CSS, MongoDB for backend data storage, AuthJS for authentication, and Bun as all-in-one JavaScript runtime.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js
- Bun
- MongoDB

### Installation

Clone the repository

```bash
git clone https://github.com/lieranderl/qwik-todo-daisyui-tailwind-mongodb-authjs-bun.git
```

Install packages

```bash
bun install
```

Make env.local file:

```text
AUTH_SECRET:
    xxxxxxxxxxxxxxxxx
GOOGLE_ID:
    xxxxxxxxxxxxxxxxx
GOOGLE_SECRET:
    xxxxxxxxxxxxxxxxx
GITHUB_OAUTH_CLIENT_ID:
    xxxxxxxxxxxxxxxxx
GITHUB_OAUTH_CLIENT_SECRET:
    xxxxxxxxxxxxxxxxx
FACEBOOK_OAUTH_CLIENT_ID:
    xxxxxxxxxxxxxxxxx
FACEBOOK_OAUTH_CLIENT_SECRET:
    xxxxxxxxxxxxxxxxx
MONGO_INITDB_ROOT_USERNAME:
    xxxxxx
MONGO_INITDB_ROOT_PASSWORD:
    xxxxxx
MONGO_DOMAIN:
    xxxxxxxxxxxxx.mongodb.net
MONGO_URI:
    mongodb+srv://$MONGO_INITDB_ROOT_USERNAME:$MONGO_INITDB_ROOT_PASSWORD@$MONGO_DOMAIN/?retryWrites=true&w=majority

```

Start the server

```bash
bun start
```

## Usage

The application allows you to add, delete, update and mark tasks as done. User authentication is handled by AuthJS, sessions stored in MongoDB. The tasks are stored in MongoDB, enabling persistence across sessions. Bun is used as the HTTP server to handle requests and responses.

## Built With

- [Qwik](https://qwik.dev/)
- [DaisyUI](https://daisyui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [AuthJS](https://www.authjs.com/)
- [Bun](https://github.com/bunjs/bun)
- [Qwik-toasts](https://github.com/lieranderl/qwik-toasts)
- [Qwik-theme-toggle](https://github.com/lieranderl/qwik-theme-toggle)

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

## Contact

Project Link: <https://github.com/lieranderl/qwik-todo-daisyui-tailwind-mongodb-authjs-bun>
