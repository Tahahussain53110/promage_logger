# Promage Logger

## **Back-End (Server)**
To start the back end of the project, use:
```bash
npm run dev
```

## **Front-End**
To run the front end of the project, use:
```bash
npm run start
```

## **Stand-Alone Logger**
The communication between the API and the logger is handled using WebSockets. To start the logger, use:
```bash
npm run start
```

A middleware named `SendEvents` is implemented for each request. When a request is made to the API server, logs containing the event name are sent to the logger. The logger saves these logs in a file using the `fs` module.

## **Planned Enhancements**
Due to time constraints, the **Interconnect Interface** has not been implemented. The proposed plan was to create a file containing all possible project events. Using webhooks, incoming requests could be handled and redirected to the appropriate routes within the application.
