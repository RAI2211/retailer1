import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Sidebar from '../sidebar/sidebar';
import axios from 'axios';
import { useRouter } from 'next/router';
import Head from 'next/head';
import css from '../../../styles/product.module.css'; // Import your external CSS module

export default function Banking() {
  const [value, setValue] = useState('one');
  const [data, setData] = useState({
    pid: '',
    pname: '',
    subcategoryid: '',
    Reg_no: '',
    price: '',
    discount: '',
    brand_name: '',
    quantity: '',
    photo: '',
  });

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/addproduct', data);
      console.log(data); // Log the data object
  
      if (response.status === 200) {
        router.push('/');
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
          <div className={css.formContainer} >
            <h2 className={css.formHeader}>ADD PRODUCT</h2>
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
                <label htmlFor="inputPid" className={css.formLabel}>Product ID</label>
                <input
                  type="text"
                  className={css.formControl}
                  id="inputPid"
                  placeholder='Enter Product ID'
                  autoComplete='off'
                  onChange={(e) => setData({ ...data, pid: e.target.value })}
                />
              </div>
              <div className={css.formGroup}>
                <label htmlFor="inputPname" className={css.formLabel}>Product Name</label>
                <input
                  type="text"
                  className={css.formControl}
                  id="inputPname"
                  placeholder='Enter Product Name'
                  autoComplete='off'
                  onChange={(e) => setData({ ...data, pname: e.target.value })}
                />
              </div>
              <div className={css.formGroup}>
                <label htmlFor="inputSubcategoryId" className={css.formLabel}>Subcategory ID</label>
                <input
                  type="text"
                  className={css.formControl}
                  id="inputSubcategoryId"
                  placeholder='Enter Subcategory ID'
                  autoComplete='off'
                  onChange={(e) => setData({ ...data, subcategoryid: e.target.value })}
                />
              </div>
              <div className={css.formGroup}>
                <label htmlFor="inputPrice" className={css.formLabel}>Price</label>
                <input
                  type="text"
                  className={css.formControl}
                  id="inputPrice"
                  placeholder='Enter Price'
                  autoComplete='off'
                  onChange={(e) => setData({ ...data, price: e.target.value })}
                />
              </div>
              <div className={css.formGroup}>
                <label htmlFor="inputDiscount" className={css.formLabel}>Discount</label>
                <input
                  type="text"
                  className={css.formControl}
                  id="inputDiscount"
                  placeholder='Enter Discount'
                  autoComplete='off'
                  onChange={(e) => setData({ ...data, discount: e.target.value })}
                />
              </div>
              <div className={css.formGroup}>
                <label htmlFor="inputBrandName" className={css.formLabel}>Brand Name</label>
                <input
                  type="text"
                  className={css.formControl}
                  id="inputBrandName"
                  placeholder='Enter Brand Name'
                  autoComplete='off'
                  onChange={(e) => setData({ ...data, brand_name: e.target.value })}
                />
              </div>
              <div className={css.formGroup}>
                <label htmlFor="inputQuantity" className={css.formLabel}>Quantity</label>
                <input
                  type="text"
                  className={css.formControl}
                  id="inputQuantity"
                  placeholder='Enter Quantity'
                  autoComplete='off'
                  onChange={(e) => setData({ ...data, quantity: e.target.value })}
                />
              </div>
              <div className={css.formGroup}>
                <label htmlFor="inputQuantity" className={css.formLabel}>Select Photo</label>
                <input
                  type="file"
                  className={css.formControl}
                  id="inputPhoto"
                  placeholder='Select Photo'
                  autoComplete='off'
                  onChange={(e) => setData({ ...data, photo: e.target.files[0] })}
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
