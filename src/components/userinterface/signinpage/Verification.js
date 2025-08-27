import React from 'react';
import { Card, CardContent, Typography, TextField, Button, IconButton, Grid } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Verification = () => {
    var navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", ""]);

  const handleChange = (event, index) => {
    const { value } = event.target;
    if (isNaN(value) || value.length > 1) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input field if current input is filled
    if (value && index < 2) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleSubmit = () => {
    const otpValue = otp.join("");
    if (otpValue.length === 3) {
        navigate('/signin')
    } else {
      alert("Please enter a valid 3-digit OTP");
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Card style={{ width: '360px', height: '500px', borderRadius: '15px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Grid container justifyContent="flex-end">
          <IconButton>
            <Close />
          </IconButton>
        </Grid>
        <CardContent style={{ paddingTop: '0' }}>
          <Grid container direction="column" alignItems="center">
            <Typography variant="h5" component="h2" style={{ fontWeight: 'bold' }}>
              OTP Verification
            </Typography>
            <Typography style={{ marginBottom: '20px', textAlign: 'center' }}>
              Enter the OTP on the given number <strong style={{ color: '#0078FF' }}>JioMart</strong> account
            </Typography>
          </Grid>

          {/* OTP Input Boxes */}
          <Grid container justifyContent="center" spacing={2} style={{ marginBottom: '20px', display: 'flex' }}>
            {otp.map((digit, index) => (
              <Grid item key={index}>
                <TextField
                  id={`otp-input-${index}`}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  inputProps={{
                    maxLength: 1,
                    style: { textAlign: 'center', fontSize: '20px', width: '50px', height: '50px' } // Increased width & height
                  }}
                  variant="outlined"
                />
              </Grid>
            ))}
          </Grid>

          <Button
            variant="contained"
            fullWidth
            style={{
              backgroundColor: '#d0d8fc',
              color: '#fff',
              marginTop: '20px',
              textTransform: 'none',
              fontSize: '16px',
              height: '45px',
            }}
            onClick={handleSubmit}
          >
            Continue
          </Button>

          <Typography variant="body2" style={{ marginTop: '20px', fontSize: '12px', textAlign: 'center' }}>
            By continuing, you agree to our <a href="#">Terms and Conditions of Use</a>, <a href="#">Privacy Policy</a> and <a href="#">Retail Account Privacy Policy</a>.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Verification;
