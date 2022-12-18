import React from 'react';
import './App.css';
import {
  useContactsQuery,
  useContactQuery,
  useAddContactMutation,
} from './services/contactsApi';

function App() {
  const [page, setPage] = React.useState(1);
  const { data, error, isLoading, isFetching, isSuccess } = useContactsQuery(
    page,
    {
      pollingInterval: 1000 * 60, 
    }
  );
  console.log('Loading: ' + isLoading, 'Fetching: ' + isFetching);

  return (
    <div className="App">
      <h1>React Redux Toolkit RTK</h1>
      {isLoading && <h2>...Loading</h2>}
      {isFetching && <h2>...Fetching</h2>}
      {error && <h2>Something went wrong</h2>}
      {isSuccess && (
        <div>
          {data?.map((contact: any) => {
            return (
              <div key={contact.id}>
                <span>{contact.name}</span>
                <span>
                  <ContactDetail id={contact.id} />
                </span>
              </div>
            );
          })}
        </div>
      )}
      <button onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>
        Back
      </button>
      <button onClick={() => setPage((prev) => prev + 1)} disabled={page === 4}>
        Forward
      </button>
      <div>
        <AddContact />
      </div>
    </div>
  );
}

export const ContactDetail = ({ id }: { id: string }) => {
  const { data } = useContactQuery(id, {
    pollingInterval: 1000 * 6,
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  return (
    <div>
      <div>{data?.id}</div>
      <div>{data?.email}</div>
      <hr />
    </div>
  );
};

export const AddContact = () => {
  const [addContact] = useAddContactMutation();
  const contact = {
    id: '11',
    name: 'akash',
    email: 'akash@gmail.com',
  };

  const addHandler = async () => {
    await addContact(contact);
  };

  return (
    <>
      <button onClick={addHandler}>Add Contact</button>
    </>
  );
};

export default App;
