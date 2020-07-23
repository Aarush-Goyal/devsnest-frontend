import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import ProfileCard from './ProfileCard';
import Header from './Header';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import image from '../images/dummy.png';
import GitHubIcon from '@material-ui/icons/GitHub';
import axios from '../config/axios.config';

type State = {
  name: string;
  email: string;
  aboutMe: string;
  github: string;
  institution: string;
  subMission: {
    subMissionFrequency: [
      {
        key: string;
        value: string;
      }
    ];
    lastSubmissions: [
      {
        name: string;
      }
    ];
  };
};

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    aboutMe: '',
    github: '',
    institution: '',
    subMission: {
      subMissionFrequency: [
        {
          key: '',
          value: '',
        },
      ],
      lastSubmissions: [
        {
          name: '',
        },
      ],
    },
  });
  let token: string = localStorage.getItem('Token') || '';
  let userData: State | null = null;
  const fetchDetails = async () => {
    if (token !== '') {
      const res = await axios.get(`/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = res;

      userData = {
        name: data.data.userData.name,
        email: data.data.userData.email,
        aboutMe: data.data.userData.aboutMe,
        github: data.data.userData.github,
        institution: data.data.userData.institution,
        subMission: {
          subMissionFrequency:
            data.data.userData.subMission.subMissionFrequency,
          lastSubmissions: data.data.userData.subMission.subMissionFrequency,
        },
      };
      setProfileData(userData);
    }
  };
  console.log(profileData.subMission.subMissionFrequency);
  useEffect(() => {
    fetchDetails();
  }, []);
  return (
    <div>
      <Header />
      {profileData ? (
        <Grid container style={{ padding: '20px' }}>
          <Grid item md={4}>
            <div>
              <img src={image} alt="profile" style={{ borderRadius: '100%' }} />
            </div>
            <div style={{ padding: '20px' }}>
              <Typography
                variant="body1"
                style={{ fontWeight: 'bold', fontSize: '35px' }}
              >
                {profileData.name}
              </Typography>
              <hr />
              <Typography
                variant="body1"
                style={{ fontWeight: 'bold', fontSize: '30px' }}
              >
                About:
              </Typography>

              <Typography variant="h6" style={{ padding: '2px' }}>
                {profileData.aboutMe}
              </Typography>

              <Typography variant="body1">
                <a
                  href={profileData.github}
                  style={{ textDecoration: 'none', color: '#000' }}
                >
                  <GitHubIcon />
                </a>
              </Typography>
              <Typography variant="body1">{profileData.institution}</Typography>
            </div>
          </Grid>
          <Grid item md={8}>
            <Typography component="div" style={{ padding: '20px' }}>
              <ProfileCard
                frequency={profileData.subMission.subMissionFrequency}
              />
            </Typography>
            <Typography component="div" style={{ padding: '20px' }}>
              <Card>
                <CardContent>
                  <Typography
                    component="h2"
                    gutterBottom
                    style={{ fontWeight: 'bold', fontSize: '30px' }}
                  >
                    Recent Activity
                  </Typography>
                </CardContent>
                {profileData
                  ? profileData.subMission.lastSubmissions.map((item) => {
                      return (
                        <CardActions>
                          <Button size="small">{item.name}</Button>
                        </CardActions>
                      );
                    })
                  : null}
              </Card>
            </Typography>
          </Grid>
        </Grid>
      ) : null}
    </div>
  );
};
export default Profile;
