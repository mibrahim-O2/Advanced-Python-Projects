# 🐍 Python Quiz Web App

A Python-based quiz application built using **Flask**, **JavaScript**, and **Bootstrap**.


---

## **Screenshot Preview**

![Quiz App Screenshot](Screenshot%202026-01-16%20233051.png)

> The image above shows the quiz interface with questions, options, and navigation buttons.

---
## **Tech Stack**

- **Backend:** Python (Flask)  
- **Frontend:** HTML, CSS, JavaScript  
- **Styling:** Bootstrap 5  

---
## **Features**

- 50 Python multiple-choice questions  
- 60-minute timer for the quiz  
- Navigation: **Previous / Next** buttons  
- Auto-submit when time expires  
- Calculates **score** and **percentage**  
- Displays performance feedback based on score:

| Percentage | Message |
|------------|---------|
| 90%+       | 🌟 Excellent! Brilliant performance! |
| 75–89%     | 🔥 Very Good! Strong Python knowledge! |
| 50–74%     | 👍 Good effort! Keep practicing! |
| <50%       | 📘 Needs improvement. Practice more! |

---
## **Quick Setup & Commands Reference**

Before running the app, make sure you have the following installed:
-   **Python 3.x**
-   **pip** (Python package manager)
    
* * *
### **Commands to Run the App Locally**
1.  **Clone the repository**:
```bash
    git clone https://github.com/mibrahim-O2/Advanced-Python-Projects.git
    cd Advanced-Python-Projects/Python-WebApps/Quiz-App
```
2.  **(Optional) Create a virtual environment**:
    
```
  python -m venv venv
```
    
 **Activate it:**
-   **PowerShell**: 
```
    .\venv\Scripts\Activate.ps1
```    
-   **CMD**:
```
    .\venv\Scripts\activate.bat
```    
3.  **Install dependencies**:
    
```
    pip install flask flask-cors
 ``` 

> Or if a `requirements.txt` file is present:
```
    pip install -r requirements.txt
   ``` 

4.  **Run the Flask app**:
    ```
    python WebApp.py

    ``` 

5.  **Open in browser**:
   ``` 
    http://127.0.0.1:5000
  ```

* * *

### **Tips & Notes**

-   Make sure `WebApp.py`, `questions.py`, `templates/`, and `static/` are in the same folder.
    
-   Use **Next / Previous** buttons to navigate questions.
    
-   The quiz **auto-submits after 60 minutes**.
    
-   You can add or edit quiz questions in `questions.py`.
    
-   Ignore Python cache files by adding a `.gitignore` with:
    

    __pycache__/
    *.pyc
    

---
