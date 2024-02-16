import {useEffect} from "react";

export function Faqs() {

    useEffect(() => {
        const faqQuestions = document?.querySelectorAll('.faq-question');

        faqQuestions.forEach(function (question) {
            question.addEventListener('click', function () {
                const title = question.querySelector('p');
                const icon = question.querySelector('img');

                // Toggle the font weight of the question
                title.classList.toggle('font-light');
                title.classList.toggle('font-bold');

                // rotate the question icon 90 degrees
                icon.classList.toggle('rotate-90');
                icon.classList.toggle('-rotate-90');

                // Toggle the hidden class for the corresponding answer
                const answer = question.nextElementSibling;
                answer.classList.toggle('hidden');

                // hide all other answers
                faqQuestions.forEach(function (faqQuestion) {
                    if (faqQuestion !== question) {
                        faqQuestion.nextElementSibling.classList.add('hidden');
                        faqQuestion.querySelector('p').classList.add('font-light');
                        faqQuestion.querySelector('p').classList.remove('font-bold');
                        faqQuestion.querySelector('img').classList.add('rotate-90');
                        faqQuestion.querySelector('img').classList.remove('-rotate-90');
                    }
                });
            });
        });
    }, []);

    return (
        <div className="bg-[#FFF2DF]">
            <div className="container py-12 md:py-20 px-4 md:px-0 px-responsive">
                <p className="font-bold font-sansita text-4xl mb-12">Frequently asked questions</p>
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <div className="mb-6 flex flex-col gap-y-3">
                            <div className="flex flex-row cursor-pointer items-baseline gap-x-6 faq-question">
                                <p className="font-light text-xl flex-1">What is KidsColorPage.com?</p>
                                <img src="/icon-angle-right.png" alt="icon-angel-right"
                                     className="w-[10px] h-auto rotate-90"/>
                            </div>
                            <p className="font-light hidden faq-answer">KidsColoringPage.com is an AI-powered coloring page
                                generator! Perfect for parents, teachers, adults, and Sunday School instructors alike,
                                KidsColoringPage.com transforms your imagination into coloring adventures. Whether
                                you're aiming to entertain your kids, engage your students, or find a moment of peace
                                and creativity for yourself, this tool is designed to cater to all your coloring needs.
                                It's as simple as envisioning what you want on a page – from educational themes to
                                personal relaxation or church activities – KidsColoringPage.com brings it to life. If
                                coloring pages are a staple in your routine, look no further than KidsColoringPage.com
                                to create them effortlessly!</p>
                        </div>
                        <div className="border border-dashed border-[#CCCAC7] mb-6 opacity-60"/>
                    </div>
                    <div className="flex flex-col">
                        <div className="mb-6 flex flex-col gap-y-3">
                            <div className="flex flex-row cursor-pointer items-baseline gap-x-6 faq-question">
                                <p className="font-light text-xl flex-1">Can I use the images I create to make my own
                                    coloring books to sell?</p>
                                <img src="/icon-angle-right.png" alt="icon-angel-right"
                                     className="w-[10px] h-auto rotate-90"/>
                            </div>
                            <p className="font-light hidden">Yes! You can use the images you create for any purpose, including
                                commercial use.</p>
                        </div>
                        <div className="border border-dashed border-[#CCCAC7] mb-6 opacity-60"/>
                    </div>
                    <div className="flex flex-col">
                        <div className="mb-6 flex flex-col gap-y-3">
                            <div className="flex flex-row cursor-pointer items-baseline gap-x-6 faq-question">
                                <p className="font-light text-xl flex-1">Can I request for a refund if my kid(s) didn't
                                    like it?</p>
                                <img src="/icon-angle-right.png" alt="icon-angel-right"
                                     className="w-[10px] h-auto rotate-90"/>
                            </div>
                            <p className="font-light hidden faq-answer">Yes! We offer a 14-day refund policy. If your kid(s) aren't
                                happy with our coloring pages, please contact us within 14 days of purchase for a full
                                refund.</p>
                        </div>
                        <div className="border border-dashed border-[#CCCAC7] mb-6 opacity-60"/>
                    </div>
                    <div className="flex flex-col">
                        <div className="mb-6 flex flex-col gap-y-3">
                            <div className="flex flex-row cursor-pointer items-baseline gap-x-6 faq-question">
                                <p className="font-light text-xl flex-1">How long does it take to refund the amount?</p>
                                <img src="/icon-angle-right.png" alt="icon-angel-right"
                                     className="w-[10px] h-auto rotate-90"/>
                            </div>
                            <p className="font-light hidden faq-answer">We process refund requests swiftly! Once you've submitted
                                your request, we aim to process your refund within 24 hours.</p>
                        </div>
                        <div className="border border-dashed border-[#CCCAC7] mb-6 opacity-60"/>
                    </div>
                </div>
            </div>
        </div>
    );
}