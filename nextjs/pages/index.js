import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

export default function Home() {
    const rps_arr_json = [
        { idx: 0, key: 'scissors', src: require("/assets/images/scissors.png") },
        { idx: 1, key: 'rock', src: require("/assets/images/rock.png") },
        { idx: 2, key: 'paper', src: require("/assets/images/paper.png") },
    ];

    const [selectedValue, setSelectedValue] = useState(-1);
    const [comValue, setComValue] = useState(-1);
    const [userSelectedMsg, setUserSelectedMsg] = useState('');
    const [mySelectedMsg, setMySelectedMsg] = useState('');

    const userSelectedImg = useMemo(() => {
        return comValue === 0 ? rps_arr_json[0].src : comValue === 1 ? rps_arr_json[1].src : rps_arr_json[2].src;
    }, [comValue])

    const userSelectedImgStyle = useMemo(() => {
        return comValue === -1 ? { width: 0, height: 0 } : { width: 150, height: 150 };
    }, [comValue])

    const mySelectedImg = useMemo(() => {
        return selectedValue === 0 ? rps_arr_json[0].src : selectedValue === 1 ? rps_arr_json[1].src : rps_arr_json[2].src;
    }, [selectedValue])

    const mySelectedImgStyle = useMemo(() => {
        return selectedValue === -1 ? { width: 0, height: 0 } : { width: 150, height: 150 };
    }, [selectedValue])

    const com_result = () => {
        const result = Math.floor(Math.random() * 3);
        setComValue(result);
    }

    const rps_result = useEffect(() => {
        if (comValue === selectedValue && comValue !== -1 && selectedValue !== -1) {
            setUserSelectedMsg('무승부');
            setMySelectedMsg('무승부');
        }
        else {
            if (comValue === 0 && selectedValue === 1) {
                setUserSelectedMsg('졌다');
                setMySelectedMsg('이겼다');
            }
            else if (comValue === 0 && selectedValue === 2) {
                setUserSelectedMsg('이겼다');
                setMySelectedMsg('졌다');
            }
            else if (comValue === 1 && selectedValue === 2) {
                setUserSelectedMsg('졌다');
                setMySelectedMsg('이겼다');
            }
            else if (comValue === 1 && selectedValue === 0) {
                setUserSelectedMsg('이겼다');
                setMySelectedMsg('졌다');
            }
            else if (comValue === 2 && selectedValue === 0) {
                setUserSelectedMsg('졌다');
                setMySelectedMsg('이겼다');
            }
            else if (comValue === 2 && selectedValue === 1) {
                setUserSelectedMsg('이겼다');
                setMySelectedMsg('졌다');
            }
        }
    }, [selectedValue, comValue])

    return (
        <div className="w-full h-full text-center bg-zinc-200">
            <div className="w-full h-4/5 flex flex-col justify-center">
                <div className="my-6">
                    <div className="mb-6 flex justify-center">
                        <div className="mr-5">상대</div>
                        <div id="userSelectedDiv">{userSelectedMsg}</div>
                    </div>
                    <div>
                        {
                            comValue === -1
                                ?
                                <></>
                                :
                                <Image src={userSelectedImg} width={userSelectedImgStyle.width} height={userSelectedImgStyle.height} />
                        }
                    </div>
                </div>
                <div className="my-6">
                    <div>
                        {
                            selectedValue === -1
                                ?
                                <></>
                                :
                                <Image src={mySelectedImg} width={mySelectedImgStyle.width} height={mySelectedImgStyle.height} />
                        }
                    </div>
                    <div className="mb-6 flex justify-center">
                        <div className="mr-5">나</div>
                        <div id="mySelectedDiv">{mySelectedMsg}</div>
                    </div>
                </div>
            </div>
            <div className="w-full h-1/5 pt-6 bg-white">
                {
                    rps_arr_json.map((item, idx) => {
                        return (
                            <Image
                                key={idx}
                                className='cursor-pointer'
                                src={item.src}
                                width={150}
                                height={150}
                                style={{ marginRight: 10 }}
                                onClick={() => { setSelectedValue(idx); com_result() }}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}
