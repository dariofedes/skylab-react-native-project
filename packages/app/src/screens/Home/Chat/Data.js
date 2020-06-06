const messages = [
    {
      _id: 2,
      text: 'Hello developer',
      createdAt: new Date(Date.UTC(2016, 5, 12, 17, 20, 0)),
      user: {
        _id: 2,
        name: 'Dario',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
    {
      _id: 3,
      text: 'Hi! I work from home today!',
      createdAt: new Date(Date.UTC(2016, 5, 13, 17, 20, 0)),
      user: {
        _id: 1,
        name: 'Maider',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
    {
      _id: 4,
      text: 'This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT',
      createdAt: new Date(Date.UTC(2016, 5, 14, 17, 20, 0)),
      user: {
        _id: 2,
        name: 'Skylab',
        avatar: 'https://placeimg.com/140/140/any',
      }
    },
    {
      _id: 5,
      text: 'This is a quick reply. Do you love Gifted Chat? (checkbox)',
      createdAt: new Date(Date.UTC(2016, 5, 15, 17, 20, 0)),
      user: {
        _id: 2,
        name: 'John Doe',
        avatar: 'https://placeimg.com/140/140/any',
      }
    },
    {
      _id: 6,
      text: 'Come on!',
      createdAt: new Date(Date.UTC(2016, 5, 15, 18, 20, 0)),
      user: {
        _id: 2,
        name: 'Alice',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
    {
      _id: 7,
      text: `Hello this is an example of the ParsedText, links like http://www.google.com or http://www.facebook.com are clickable and phone number 444-555-6666 can call too.
          But you can also do more with this package, for example Bob will change style and David too. foo@gmail.com
          And the magic number is 42!
          #react #react-native`,
      createdAt: new Date(Date.UTC(2016, 5, 13, 17, 20, 0)),
      user: {
        _id: 1,
        name: 'Maider',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
  ];
  
  export default messages;