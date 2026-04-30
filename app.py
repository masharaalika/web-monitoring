from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return """
    <html>
        <head><title>Web Python Pertama</title></head>
        <body style="font-family: sans-serif; text-align: center; margin-top: 50px;">
            <h1 style="color: #2c3e50;">Halo! Ini Web dari Python</h1>
            <p>Berhasil dijalankan di komputer saya.</p>
            <button onclick="alert('Python itu keren!')">Klik Saya</button>
        </body>
    </html>
    """

if __name__ == '__main__':
    app.run(debug=True) 