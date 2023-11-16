from flask import Flask, render_template, request, jsonify
from flask_pymongo import PyMongo
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}}, methods=["GET", "POST"])

app.config[
    'MONGO_URI'] = 'mongodb+srv://dinujoy7301:root@cluster0.cdvsqw3.mongodb.net/newcal'
mongo = PyMongo(app)


# Route for serving index.html
@app.route('/')
def index():
  return render_template("index.html")


@app.route('/api/saving-event', methods=['GET', 'POST'])
def save_event():
  try:
    data = request.json
    event_date = data.get('date')

    # Convert the date string to a datetime object if needed
    # event_date = datetime.strptime(event_date, '%Y-%m-%d')

    # Save the event date and text to MongoDB
    mongo.db.events.insert_one({
        'date': event_date,
        'event': data.get('event'),
    })

    return jsonify({'status': 'success'})
  except Exception as e:
    app.logger.error(f"Error saving event: {str(e)}")
    return jsonify({'status': 'error', 'message': str(e)})


if __name__ == '__main__': app.run(host='0.0.0.0', debug=True)
