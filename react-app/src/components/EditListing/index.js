
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editListing } from '../../store/listing'
import styles from './EditListing.module.css'

function EditListing(){
    const history = useHistory();
    const dispatch = useDispatch();
    const { listingId } = useParams();

    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ price, setPrice ] = useState(0);
    const [ totalBedrooms, setTotalBedrooms ] = useState(0);
    const [ totalBathrooms, setTotalBathrooms ] = useState(0);
    const [ sqFt, setSqFt ] = useState(0);
    const [ hasKitchen, setHasKitchen ] = useState(false);
    const [ hasInternet, setHasInternet ] = useState(false);
    const [ imageLoading, setImageLoading ] = useState(false);
    const [ currentImages, setCurrentImages ] = useState([]);

    // console.log("price:", typeof(parseInt(price), 10), "totalBedrooms:", typeof(totalBedrooms), "totalBathrooms:", totalBathrooms, "sqFt:", sqFt, "hasKitchen:", hasKitchen, "hasInternet:", hasInternet)
    console.log("CurrentImgarray", currentImages)
    console.log("listingId", listingId)
    const addImage = (e) => {
        const file = e.target.files[0];
        if (file){
        setCurrentImages((prevVal) => [...prevVal, file])
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (let i = 0; i < currentImages.length; i++) {
            formData.append(`images`, currentImages[i]);
        }
        // });
        for (var key of formData.keys()) {
            console.log(key);
         }

        setImageLoading(true);

        const payload = {
            name,
            description,
            price: parseInt(price),
            total_bedrooms: parseInt(totalBedrooms),
            total_bathrooms: parseInt(totalBathrooms),
            sq_ft: parseInt(sqFt),
            hasKitchen,
            hasInternet,
        };

        console.log('submitted!', payload, formData, listingId)
        const listing = await dispatch(editListing(payload, formData, listingId));
        setImageLoading(false);
        if (listing) {
            history.push('/listings')
        }
    };

    return (
        <div className={styles.newListingPage}>
            <h1 className={styles.header}>New Listing</h1>
            <form className={styles.form} onSubmit={onSubmit}>
                <div className={styles.formName}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" className={styles.formInput} id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className={styles.formNums}>
                    <div className={styles.formPrice}>
                    <label htmlFor="price">Price:</label>
                    <input type="number" className={styles.formInput} id="price" placeholder="Price" value={price} onChange={(e) => parseInt(setPrice(e.target.value), 10)} />
                    </div>
                    <div className={styles.formPrice}>
                    <label htmlFor="sqFt">Square Foot:</label>
                    <input type="number" className={styles.formInput} id="sqFt" placeholder="Square Foot" value={sqFt} onChange={(e) => setSqFt(e.target.value)} />
                    </div>
                </div>

                <div className={styles.formNums}>
                    <div className={styles.formPrice}>
                    <label htmlFor="totalBedrooms">Total Bedrooms:</label>
                    <input type="number" className={styles.formInput} id="totalBedrooms" placeholder="Total Bedrooms" value={totalBedrooms} onChange={(e) => setTotalBedrooms(e.target.value)} />
                    </div>
                {/* </div>
                <div className={styles.formGroup}> */}
                    <div className={styles.formPrice}>
                    <label htmlFor="totalBathrooms">Total Bathrooms:</label>
                    <input type="number" className={styles.formInput} id="totalBathrooms" placeholder="Total Bathrooms" value={totalBathrooms} onChange={(e) => setTotalBathrooms(e.target.value)} />
                    </div>
                </div>
                <div className={styles.formCheck}>
                    <div>
                    <label htmlFor="hasKitchen">Has Kitchen:</label>
                    <input type="checkbox" className={styles.formInput} id="hasKitchen" placeholder="Has Kitchen" value={hasKitchen} onChange={() => setHasKitchen(!hasKitchen)} />
                    </div>
                    <div>
                    <label htmlFor="hasInternet">Has Internet:</label>
                    <input type="checkbox" className={styles.formInput} id="hasInternet" placeholder="Has Internet" value={hasInternet} onChange={() => setHasInternet(!hasInternet)} />
                    </div>
                </div>
                <div className={styles.formDescription}>
                    <label htmlFor="description">Description:</label>
                    <textarea className={styles.formInput} id="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className={styles.formImg}>
                    <label htmlFor="images">Upload some images for your guests?</label>
                    <input type="file" className={styles.formInput} id="images" placeholder="Images" onChange={addImage} multiple/>
                </div>
                <div className={styles.formBtn}>
                    <button type="submit" className={styles.button}>Submit</button>
                </div>
                {(imageLoading)&& <p>Loading...</p>}
            </form>
        </div>
    )
}

export default EditListing;