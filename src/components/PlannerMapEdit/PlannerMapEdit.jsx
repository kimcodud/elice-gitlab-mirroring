import React, { useEffect, useState } from 'react';
import DestinationList from '../DestinationList/DestinationList';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PlannerMapEdit() {
  const [list, setList] = useState([]);

  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState(null);
  const [polyline, setPolyline] = useState(null);

  const [isAll, setIsAll] = useState(true);
  const [dateIndex, setDateIndex] = useState();

  const [allLocation, setAllLocation] = useState([]);

  const [formattedStartDate, setFormattedStartDate] = useState('');
  const [formattedEndDate, setFormattedEndDate] = useState('');

  const { id } = useParams();

  const fetchData = async () => {
    try {
      const apiUrl =
        import.meta.env.VITE_APP_SERVER_MODE === 'DEV'
          ? import.meta.env.VITE_APP_API_DEV_URL
          : import.meta.env.VITE_APP_API_PROD_URL;
      const response = await axios.get(`${apiUrl}/travels/${id}`, {
        withCredentials: true,
      });
      const { data } = response;

      const startDate = data.travelPlanData.startDate;
      const endDate = data.travelPlanData.endDate;
      const destination = data.travelPlanData.destination;
      const dates = data.travelPlanData.dates;

      console.log(response.data.travelPlanData);
      setList(response.data.travelPlanData);

      if (startDate) {
        const date = new Date(startDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setFormattedStartDate(formattedDate);
      }

      if (endDate) {
        const date = new Date(endDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setFormattedEndDate(formattedDate);
      }

      attachMapSdkScript();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    setIsAll(true);
  }, [id]);

  useEffect(() => {
    if (list && list.dates) {
      setAllLocation(list.dates.flatMap((date) => date.locations));
      console.log(list);
    }
  }, [list]);

  const whereToShow = () => {
    if (isAll) {
      return allLocation;
    } else if (dateIndex !== null) {
      const selectedDate = datesToRender[dateIndex - 1];
      return selectedDate ? selectedDate.locations : null;
    } else {
      return null;
    }
  };

  const handleClickAll = () => {
    setIsAll(true);
    setDateIndex(null);
  };

  const handleClickDay = (index) => {
    setIsAll(false);
    setDateIndex(index);
  };

  useEffect(() => console.log(dateIndex), [dateIndex]);

  const attachMapSdkScript = () => {
    const script = document.createElement('script');
    const KAKAO_MAP_KEY = import.meta.env.VITE_APP_KAKAOMAP_KEY;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&libraries=services&autoload=false`;
    script.defer = true;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const mapOptions = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 3,
        };
        const newMap = new window.kakao.maps.Map(mapContainer, mapOptions);
        setMap(newMap);
      });
    };

    document.head.appendChild(script);
  };

  useEffect(() => {
    attachMapSdkScript();
  }, []);

  useEffect(() => {
    if (list && map) {
      markers?.forEach((marker) => marker.setMap(null));
      polyline?.setMap(null);

      const newMarkers = [];
      const linePath = [];

      const locationsToDisplay = whereToShow();

      locationsToDisplay.forEach((position) => {
        const latlng = new window.kakao.maps.LatLng(
          position.latitude,
          position.longitude
        );

        const marker = new window.kakao.maps.Marker({
          map: map,
          position: latlng,
        });

        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;z-index:1;font-weight:300;">${position.location}</div>`,
        });

        window.kakao.maps.event.addListener(marker, 'mouseover', () => {
          infowindow.open(map, marker);
        });

        window.kakao.maps.event.addListener(marker, 'mouseout', () => {
          infowindow.close();
        });

        newMarkers.push(marker);
        linePath.push(latlng);
      });

      const newPolyline = new window.kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 4,
        strokeColor: '#9198e5',
        strokeOpacity: 0.9,
        strokeStyle: 'solid',
      });

      newPolyline.setMap(map);

      setMarkers(newMarkers);
      setPolyline(newPolyline);

      const bounds = new window.kakao.maps.LatLngBounds();
      newMarkers.forEach((marker) => {
        bounds.extend(marker.getPosition());
      });
      map.setBounds(bounds);
      console.log('locationsToDisplay', locationsToDisplay);
    }
  }, [list, map, isAll, dateIndex]);

  let datesToRender = [];
  if (list && list.dates) {
    datesToRender = list.dates;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '16px',
      }}
    >
      <div>
        <div style={{ display: 'flex' }}>
          <a
            href="/mypage"
            className="flex flex-row items-center w-full h-1/12 mb-3"
            style={{ cursor: 'pointer' }}
          >
            <img
              src="/assets/goBackIcon.webp"
              className="w-6 h-6 mr-6"
              alt="go back to mypage"
            />
            <span className="text-2xl">마이페이지</span>
          </a>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#E9EBED',
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            padding: '20px',
            borderRadius: '4px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <div
                className="rounded"
                style={{
                  height: '322px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '300px',
                    height: '77px',
                    fontWeight: 700,
                    fontSize: '30px',
                    color: '#6645B9',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div>{list.destination}</div>
                </div>
                <div
                  style={{
                    width: '300px',
                    height: '77px',
                    fontWeight: 700,
                    fontSize: '30px',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div>{datesToRender.length} Day</div>
                </div>
                <div
                  style={{
                    width: '300px',
                    height: '50px',
                    fontWeight: 700,
                    fontSize: '20px',
                    color: '#6C6C6C',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <div>
                    {formattedStartDate} ~ {formattedEndDate}
                  </div>
                </div>
                <div
                  style={{
                    width: '300px',
                    height: '50px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '30px',
                      height: '30px',
                      backgroundColor: '#FFD700',
                      borderRadius: '50%',
                    }}
                  ></div>
                  <div
                    style={{
                      color: '#6C6C6C',
                      fontWeight: 700,
                      fontSize: '20px',
                      paddingLeft: '20px',
                    }}
                  >
                    {allLocation.length} places
                  </div>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: 'white',
                  padding: '10px',
                  borderRadius: '4px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'auto',
                  }}
                >
                  <div>
                    <div
                      style={{
                        width: '322px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '168px',
                          height: '48px',
                          fontWeight: 700,
                          fontSize: '20px',
                          marginBottom: '10px',
                        }}
                      >
                        여행 장소
                      </div>
                    </div>
                    <div
                      style={{
                        width: '322px',
                        height: '0px',
                        border: '3px solid #6645B9',
                        opacity: '0.5',
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: '10px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        paddingTop: '20px',
                      }}
                    >
                      <button
                        className={`w-16 h-10 font-bold mb-7 rounded ${
                          isAll
                            ? 'bg-[#B09FCE] text-[#E9EBED]'
                            : 'bg-[#E9EBED] text-[#B09FCE]'
                        }  hover:bg-[#6645B9] `}
                        onClick={handleClickAll}
                      >
                        전체
                      </button>

                      {datesToRender.map((item, index) => (
                        <button
                          className={`w-16 h-10 font-bold mb-7 rounded ${
                            isAll
                              ? 'bg-[#E9EBED] text-[#B09FCE]'
                              : 'bg-[#B09FCE] text-[#E9EBED]'
                          }  hover:bg-[#6645B9] `}
                          key={index}
                          onClick={() => handleClickDay(index + 1)}
                        >
                          DAY {index + 1}
                        </button>
                      ))}
                    </div>
                    <div>
                      {list && (
                        <DestinationList
                          isAll={isAll}
                          list={list}
                          dateIndex={dateIndex}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              marginLeft: '20px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div
              id="map"
              className="rounded"
              style={{
                width: '1000px',
                height: '1000px',
                border: '5px solid #6645B9',
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlannerMapEdit;
