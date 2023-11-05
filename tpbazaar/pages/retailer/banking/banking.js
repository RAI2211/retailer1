import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Sidebar from '../sidebar/sidebar';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import css from '../../../styles/banking.module.css'; // Import your external CSS module

export default function Banking() {
  const [value, setValue] = useState('one');
  const [data, setData] = useState({
    Reg_no: '',
    Bankaccountno: '',
    Bankaccountname: '',
    Ifsc: '',
    Bankname: '',
    Branch: '',
    upi: '',
    Status: 'inactive',
  });

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/admin/adduser', data);

      if (response.status === 200) {
        router.push('/users');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Sidebar>
      <div>
        <Head>
          <link rel="stylesheet" href="/banking.css" /> {/* Link to the external CSS */}
        </Head>
        <Box sx={{ width: '100%' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab value="one" label="ADD" />
            <Tab value="two" label="View" />
          </Tabs>
        </Box>
      </div>

      {value === 'one' && (
        <div>
          <div className={css.formContainer}> {/* Use the CSS module class */}
            <h2 className={css.formHeader}>ADD USER</h2>
            <form className={css.form} onSubmit={handleSubmit}>
              <div className={css.formGroup}>
                <label htmlFor="inputReg_no" className={css.formLabel}>Reg_no</label>
                <input
                  type="text"
                  className={css.formControl}
                  id="inputReg_no"
                  placeholder='Enter Reg_no'
                  autoComplete='off'
                  onChange={(e) => setData({ ...data, Reg_no: e.target.value })}
                />
              </div>
              <div className={css.formGroup}>
                <label htmlFor="inputBankaccountno" className={css.formLabel}>Bank Account Number</label>
                <input
                  type="text"
                  className={css.formControl}
                  id="inputBankaccountno"
                  placeholder='Enter Account Number'
                  autoComplete='off'
                  onChange={(e) => setData({ ...data, Bankaccountno: e.target.value })}
                />
              </div>
              <div className={css.formGroup}>
                <label htmlFor="inputBankaccountname" className={css.formLabel}>Bank Account Name</label>
                <input
                  type="text"
                  className={css.formControl}
                  id="inputBankaccountname"
                  placeholder='Enter Account Name'
                  autoComplete='off'
                  onChange={(e) => setData({ ...data, Bankaccountname: e.target.value })}
                />
              </div>
              <div className={css.formGroup}>
                <label htmlFor="inputIfsc" className={css.formLabel}>IFSC Code</label>
                <input
                  type="text"
                  className={css.formControl}
                  id="inputIfsc"
                  placeholder='Enter IFSC Code'
                  autoComplete='off'
                  onChange={(e) => setData({ ...data, Ifsc: e.target.value })}
                />
              </div>
              <div className={css.formGroup}>
                <label htmlFor="inputBankname" className={css.formLabel}>Bank Name</label>
                <input
                  type="text"
                  className={css.formControl}
                  id="inputBankname"
                  placeholder='Enter Bank Name'
                  autoComplete='off'
                  onChange={(e) => setData({ ...data, Bankname: e.target.value })}
                />
              </div>
              <div className={css.formGroup}>
                <label htmlFor="inputBranch" className={css.formLabel}>Branch</label>
                <input
                  type="text"
                  className={css.formControl}
                  id="inputBranch"
                  placeholder='Enter Branch'
                  autoComplete='off'
                  onChange={(e) => setData({ ...data, Branch: e.target.value })}
                />
              </div>
              <div className={css.formGroup}>
                <label htmlFor="inputUpi" className={css.formLabel}>UPI</label>
                <input
                  type="text"
                  className={css.formControl}
                  id="inputUpi"
                  placeholder='Enter UPI'
                  autoComplete='off'
                  onChange={(e) => setData({ ...data, upi: e.target.value })}
                />
              </div>
              <div className={css.formGroup}>
                <button type="submit" className={css.submitButton}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {value === 'two' && (
        <div>
          <h1>View Tab Content</h1>
          <p>This is the content for the View tab.</p>
        </div>
      )}
    </Sidebar>
  );
}









// import * as React from 'react';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
// import Sidebar from '../sidebar/sidebar';

// export default function Banking() {
//   const [value, setValue] = React.useState('one');

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Sidebar>
//       <div>
//         <Box sx={{ width: '100%' }}>
//           <Tabs
//             value={value}
//             onChange={handleChange}
//             textColor="secondary"
//             indicatorColor="secondary"
//             aria-label="secondary tabs example"
//           >
//             <Tab value="one" label="ADD" />
//             <Tab value="two" label="View" />
//           </Tabs>
//         </Box>
//       </div>

//       {/* "ADD" tab */}
//       {value === 'one' && (
//         <div>
//           {/* Add your content for the "ADD" tab here */}
//           <h1>ADD Tab Content</h1>
//           <p>This is the content for the ADD tab.</p>
//         </div>
//       )}

//       {/*  "View" tab */}
//       {value === 'two' && (
//         <div>
//           {/* Add your content for the "View" tab here */}
//           <h1>View Tab Content</h1>
//           <p>This is the content for the View tab.</p>
//         </div>
//       )}
//     </Sidebar>
//   );
// }


// import React from 'react'
// import Sidebar from '../sidebar/sidebar'

//   return (

//   )
// }




