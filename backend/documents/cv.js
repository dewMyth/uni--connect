module.exports = ({
  firstName,
  lastName,
  dateOfBirth,
  profilePictureCV,
  email,
  phone,
  jobPosition,
  workPlaceOne,
  workPlaceTwo,
  averageSalaray,
  studentNo,
  degree,
  department,
  faculty,
  bio,
}) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        />
        <title>My CV</title>
      </head>
      <body>
        <div class="container">
          <div class="card shadow-sm" id="post-card">
            <div class="card-body">
            <div class="card-img-top">
            <img src=${profilePictureCV} alt=""not found"/>
            </div>
              <div class="row">
                <div class="col-md-6 col-xs-6">
                  <h5 class="card-title">Personal Information</h5>
                </div>
              </div>
              <div class="card-subtitle">Name</div>
              <p class="card-text">
                <b>
                  ${firstName} ${lastName}
                  ${profilePictureCV}
                </b>
              </p>
              <div class="card-subtitle">Email</div>
              <p class="card-text">
                <b>${email}</b>
              </p>
              <div class="card-subtitle">Contact No</div>
              <p class="card-text">
                <b>${phone}</b>
              </p>
              <div class="card-subtitle">Date of Birth</div>
              <p class="card-text">
                <b>${dateOfBirth}</b>
              </p>
            </div>
          </div>
    
        
          <br>
          <div class="card shadow-sm" id="post-card">
            <div class="card-body">
              <div class="row">
                <div class="col-md-6 col-xs-6">
                  <h5 class="card-title">Education</h5>
                </div>
              </div>
              <div class="card-subtitle">University</div>
              <p class="card-text">Degree : <b>${degree}</b></p>
              <p class="card-text">Department : <b>${department}</b></p>
              <p class="card-text">Faculty : <b>${faculty}</b></p>
              <div class="card-subtitle">School</div>
              <p class="card-text">{this.state.degree}</p>
              <div class="card-subtitle">Department</div>
              <p class="card-text">{this.state.department}</p>
              <div class="card-subtitle">Faculty</div>
              <p class="card-text">{this.state.faculty}</p>
            </div>
          </div>
          <br>
       
          <div class="card shadow-sm" id="post-card">
            <div class="card-body">
              <div class="row">
                <div class="col-md-6 col-xs-6">
                  <h5 class="card-title">Work</h5>
                </div>
              </div>
              <div class="card-subtitle">Current Occupation</div>
              <p class="card-text" style="font-size: 15px;">
                ${jobPosition} at ${workPlaceOne}
              </p>
              <div>
                Salary Range ( 0 - 300, 000 LKR)
                <progress
                  color="success"
                  value="{Math.floor(Math.random()"
                  *
                  100)
                  +
                  1}
                ></progress>
              </div>
              <br />
              <br />
              <div class="card-subtitle">Previous Job</div>
              <p class="card-text">${workPlaceTwo}/p>
              <div class="card-subtitle">Current Job</div>
            </div>
          </div>
        </div>
      </body>
    </html>
    `;
};
