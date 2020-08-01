import React, { useEffect, useState } from 'react';
import axios from '../config/axios.config';
import Header from './Header';
import Chapter from './Chapter';
import {} from '../config/axios.config';
function Curriculum(props: any) {
  const [chapters, setChapters] = useState([]);

  const id: number = props.match.params.id;
  let percentageCompleted: number;
  let token: string = localStorage.getItem('Token') || '';

  const fetchDetails = async () => {
    if (token !== '') {
      const res = await axios.get(`/api/curriculums/${id}/chapter`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = res;
      let allSubTasks = data.data.map((item: any) => {
        const task = {
          id: item.id,
          text: item.name,
          slug: item.slug,
        };
        return task;
      });
      setChapters(allSubTasks);
    }
  };
  useEffect(() => {
    fetchDetails();
  }, []);

  console.log('chapters: ', chapters);
  return (
    <>
      <Header />
      {chapters.map((task: any) => (
        <Chapter
          key={task.id}
          task={task}
          percentageCompleted={percentageCompleted}
          updateAllTasks={() => fetchDetails()}
        />
      ))}
    </>
  );
}

export default Curriculum;
