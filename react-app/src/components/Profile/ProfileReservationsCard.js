
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReservations, unloadReservation } from '../../store/reservation'
import styles from './Profile.module.css'
import { FcDeleteDatabase } from 'react-icons/fc'
import { BiEditAlt } from 'react-icons/bi'

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Navigation, Pagination} from 'swiper';
import 'swiper/swiper-bundle.css'

SwiperCore.use([Navigation, Pagination])

function ProfileReservationsCard({user}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const reservations = useSelector((state) => Object.values(state.reservation));
    console.log("reservations:", reservations)

    useEffect(() => {
        dispatch(getAllReservations(user.id));
        dispatch(unloadReservation)
    }, [user.id]);

    const slides = [];
    let i = 0;
    reservations?.forEach((reservation) => {
        const reservationId = reservation.id;
        slides.push(
            <SwiperSlide key={`slide:${i}`} className={styles.slide}>
            <div className={styles.slideContent}>
                <div className={styles.listingHeader}>
                    <h3 className={styles.listingName}>Reservation Name</h3>
                </div>
                <div className={styles.listingButtons}>
                    <div className={styles.deleteButton}>
                        <FcDeleteDatabase className={styles.deleteIcon}/>
                    </div>
                    <div className={styles.editButton} onClick={() => {history.push(`/edit-reservation/${reservationId}`)}}>
                        <BiEditAlt className={styles.editIcon}/>
                    </div>
                </div>
            </div>
        </SwiperSlide>
        );
        i++;
    });

    return (
        <div className={styles.profileListingsCard}>
            <h2 className={styles.listingHeader}>Your Reservations</h2>
            <div className={styles.listingCarousel}>
                <Swiper id="main" 
                    tag="section" 
                    wrapperTag="ul" 
                    className={styles.swiperContainer}
                    navigation 
                    pagination 
                    spaceBetween={0} 
                    slidesPerView={1}
                    // onInit={(swiper) => console.log('Swiper initialized', swiper)}
                    // onSlideChange={(swiper) => {
                    //     console.log('Swiper slide: ', swiper)
                    // }}
                    // onReachEnd={() => console.log("Swiper end")}
                >{slides}</Swiper>
            </div>
        </div>
    )
}

export default ProfileReservationsCard;