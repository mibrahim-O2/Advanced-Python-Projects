from flask import Flask, jsonify, render_template
from questions import questions
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/questions")
def get_questions():
    """
    Returns maximum 50 questions.
    Shuffles questions for randomness.
    """
    shuffled_questions = questions.copy()
    random.shuffle(shuffled_questions)
    return jsonify(shuffled_questions[:50])


if __name__ == "__main__":
    app.run(debug=True)
