import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import Flip from './components/Flip';
import initialData from './initialData';
import './styles.css';

const CLASSES = gql`
  query MyQuery {
    class {
      id
      type
      img
      animals {
        id
        name
      }
    }
  }
`;

export default function App() {
  const { loading, error, data } = useQuery(CLASSES);
  const [flipped, flip] = React.useState('');

  if (loading) {
    return <div>Loading...</div>
  }
  
  if (error) {
    return <div>Something went wrong!</div>
  }

  return (
    <div className="App">
      <main>
        {data.class.map(classData => (
          <Flip
            key={classData.type}
            flip={() => {
              flip(classData.type);
            }}
            Front={() => (
              <div
                style={{
                  backgroundImage: `url(${classData.img})`,
                  height: '100%'
                }}
              >
                <h2 className="title">{classData.type}</h2>
              </div>
            )}
            Back={() => (
              <div className="List">
                {classData.animals.map(animal => (
                  <div className="List__item" key={animal.name}>
                    {animal.name}
                  </div>
                ))}
              </div>
            )}
            flipped={classData.type === flipped}
          />
        ))}
      </main>
    </div>
  );
}
