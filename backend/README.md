### Backend setup

#### Requirements
- Python 3.8 or higher installed
- pip (Python's package manager)

#### Create venv
```bash
$ python -m venv venv
```

#### Enter venv (Windows only)
```bash
$ .\venv\Scripts\Activate.ps1
```

#### Install dependencies
```bash
$ pip install -r requirements.txt
```

#### Change the database credentials to your local credentials
File: app/db/database.py
```python
DATABASE_USER = "user"
DATABASE_PASSWORD = "password"
DATABASE_HOST = "localhost"
DATABASE_NAME = "database"
```

#### Run project
```bash
$ cd app
$ uvicorn main:app --reload
```

#### Testing the API:
* Swagger UI: http://127.0.0.1:8000/docs


#### Running tests:
```bash
$ cd app
$ python -m pytest tests
```