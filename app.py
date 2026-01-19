from flask import Flask, render_template, request, flash, redirect, url_for
from flask_mail import Mail, Message
from config import Config
import logging

app = Flask(__name__)
app.config.from_object(Config)

mail = Mail(app)

# --------------------------
# LOGGING (optional but useful)
# --------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler("app.log"),
        logging.StreamHandler()
    ]
)

# --------------------------
# ROUTES
# --------------------------

@app.route('/')
def home():
    return render_template('index.html', title="Home")

@app.route('/about')
def about():
    return render_template('about.html', title="About Us")

@app.route('/products')
def products():
    return render_template('products.html', title="Products")

@app.route('/capabilities')
def capabilities():
    return render_template('capabilities.html', title="Capabilities")

@app.route('/facility')
def facility():
    return render_template('facility.html', title="Facility")

@app.route('/projects')
def projects():
    return render_template('projects.html', title="Projects")

@app.route('/people')
def people():
    return render_template('people.html', title="People")

@app.route('/presence')
def presence():
    return render_template('presence.html', title="Presence")

# --------------------------
# CONTACT FORM
# --------------------------

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        company = request.form.get('company')
        phone = request.form.get('phone')
        email_addr = request.form.get('email')
        requirement = request.form.get('requirement')
        model = request.form.get('model')
        user_message = request.form.get('message')

        msg = Message(
            subject=f"New Website Enquiry from {name}",
            recipients=[app.config['MAIL_USERNAME']]
        )

        msg.body = f"""
New Enquiry Received from Website
----------------------------------
Name: {name}
Company: {company}
Phone: {phone}
Email: {email_addr}

Requirement: {requirement}
Machine Model: {model}

Message Details:
{user_message}
"""

        try:
            mail.send(msg)
            flash("Thank you! Your enquiry has been sent to our engineering team.", "success")
            logging.info(f"Email sent from {name} ({email_addr})")
        except Exception as e:
            logging.error(f"Email error: {e}")
            flash("Error sending enquiry. Please try again later.", "danger")

        return redirect(url_for('contact'))

    return render_template('contact.html', title="Contact")

# --------------------------
# GUNICORN ENTRYPOINT
# --------------------------

def create_app():
    return app

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
