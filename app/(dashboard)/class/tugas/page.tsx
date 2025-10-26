'use client';

import { useEffect, useState } from 'react';
import { FiFileText, FiLink } from 'react-icons/fi';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Resource {
    title: string;
    link: string;
}

interface Section {
    sectionName: string;
    summary: string;
    resources: Resource[];
}

interface Course {
    title: string;
    url: string;
    sections: Section[];
}

function isFile(link: string) {
    return /\.(pdf|pptx?|docx?|xlsx?|zip|rar)$/i.test(link);
}

export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await fetch('/api/tugas');

                if (!res.ok) {
                    throw new Error(`HTTP Error: ${res.status}`);
                }

                const text = await res.text();
                const data = text ? JSON.parse(text) : { courses: [] };

                setCourses(data.courses);
            } catch (error) {
                console.error("API Tugas Error:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);
    if (loading) return <p className="p-4 text-gray-600">Loading...</p>;
    return (
        <main className="p-4 h-full overflow-hidden">
            <h1 className="text-3xl font-bold mb-4 text-center items-center">Materi Pelajaran Semester I</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {courses.map((course, i) => (
                    <Card key={i} className="h-[300px] overflow-hidden shadow-lg hover:shadow-xl transition">
                        <CardHeader>
                            <CardTitle className="text-md overflow-hidden border-b border-gray-400 p-2">{course.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="card-content overflow-y-auto h-[calc(100%-3rem)] space-y-2">
                            {course.sections.map((sec, j) => (
                                <div key={j} className="border-b border-gray-400">
                                    <h3 className="font-medium text-sm md:text-md">{sec.sectionName}</h3>
                                    {sec.summary && <p className="italic text-gray-600">{sec.summary}</p>}
                                    <ul className="flex flex-col gap-1">
                                        {sec.resources.map((res, k) => (
                                            <li key={k} className="flex items-center gap-2 p-1 rounded transition text-sm">
                                                {isFile(res.link) ? <FiFileText className="text-gray-700 w-4 h-4" /> : <FiLink className="text-gray-700 w-4 h-4" />}
                                                <a href={res.link} target="_blank" className="text-blue-600 break-words">
                                                    {res.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </main>
    );
}
