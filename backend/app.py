from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

tasks = [

    {
        "id": 1,
        "text": "Learn Flask",
        "category": "Learning",
        "dueDate": "2026-06-30",
        "completed": False
    },

    {
        "id": 2,
        "text": "Visit Japan",
        "category": "Travel",
        "dueDate": "2026-07-15",
        "completed": True
    }

]

@app.route("/tasks")
def get_tasks():

    return jsonify(tasks)


@app.route("/add-task", methods=["POST"])
def add_task():

    data = request.get_json()

    new_task = {

    "id": len(tasks) + 1,

    "text": data["text"],

    "category": data["category"],

    "dueDate": data["dueDate"],

    "completed": False

}
    tasks.append(new_task)

    return jsonify({

        "message": "Task added successfully"

    })

@app.route("/delete-task/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):

    global tasks

    tasks = [
        task for task in tasks
        if task["id"] != task_id
    ]

    return jsonify({
        "message": "Task deleted successfully"
    })


@app.route("/complete-task/<int:task_id>", methods=["PATCH"])
def complete_task(task_id):

    for task in tasks:

        if task["id"] == task_id:

            task["completed"] = not task["completed"]

            break

    return jsonify({

        "message": "Task updated successfully"

    })


@app.route("/edit-task/<int:task_id>", methods=["PATCH"])
def edit_task(task_id):

    data = request.get_json()

    for task in tasks:

        if task["id"] == task_id:

            task["text"] = data["text"]
            task["category"] = data["category"]
            task["dueDate"] = data["dueDate"]

            break

    return jsonify({

        "message": "Task updated successfully"

    })


@app.route("/clear-tasks", methods=["DELETE"])
def clear_tasks():

    global tasks

    tasks = []

    return jsonify({

        "message": "All tasks deleted successfully"

    })


if __name__ == "__main__":
      app.run(debug=True)