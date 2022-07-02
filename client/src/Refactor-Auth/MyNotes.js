/* -------------------------------------------------------------------------- */
/*                                  useState                                  */
/* -------------------------------------------------------------------------- */

const [apiURL, setapiURL] = useState(`http://localhost:5000/api/courses`);
const [things, setThings] = useState({
  thingOne: 1,
  thingTwo: 2,
});

/* -------------------------------------------------------------------------- */
/*                            // IFFE for useEffect                           */
/* -------------------------------------------------------------------------- */

useEffect(() => {
  console.log(`${apiURL}`);
  (async () => {
    try {
      const data = await axios.get(`${apiURL}`, options);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  })();
}, [apiURL, options]);

/**
 * Builds Authorization Header
 * @param {string} username - Email address of user
 * @param {string} userpassword - User password.
 * @return {Object} - response object?
 */
function buildAuthHeader(username, userPassword) {
  const options = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  return options;
}
