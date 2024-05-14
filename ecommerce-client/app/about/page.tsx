"use client";
import { useState, useEffect } from 'react';
import Container from '../components/Container';
import AboutTopics from '../components/about/AboutTopics';
import Aboutbutton from '../components/about/Aboutbutton';
import { useAboutStore } from '../store/AboutStore';

export default function AboutPage() {
    const { aboutData, setAboutData } = useAboutStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        
        const name = queryParams.get('name');
        
        if (name !== null) {
            setAboutData(name);
        }
    }, []);

    useEffect(() => {
        setIsMounted(true);
        const timeout = setTimeout(() => setIsMounted(false), 100);
        return () => {
            setIsMounted(false);
            clearTimeout(timeout);
        };
    }, [aboutData]);

    return (
        <Container>
            <div className="container container-main md:my-20 my-5">
                <div className="grid grid-cols-12 gap-4">
                    <div className="md:col-span-3 col-span-12 md:border-r-2 md:border-b-0  border-b-2 mb-5 md:mb-0 pb-5 md:pb-0 border-someGreen p-2">
                        <Aboutbutton />
                    </div>
                    <div className="md:col-span-9 col-span-12">
                        <div id="SHOW_CONTENT_ABOUT" className={`transform transition-all ${isMounted ? 'duration-0 opacity-0 translate-y-5' : 'duration-500 opacity-100 -translate-y-0'}`}>
                            <div className="">
                                <div className="d-flex justify-content-start align-items-center pb-3">
                                    <AboutTopics Topic={aboutData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}