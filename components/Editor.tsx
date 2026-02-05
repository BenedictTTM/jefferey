'use client';

import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

// Cast to any to avoid React 19 type incompatibility issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false }) as any;

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
}

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
        ['clean'],
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list',
    'link',
];

export default function Editor({ value, onChange }: EditorProps) {
    return (
        <div className="bg-white [&_.ql-editor]:text-gray-900">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                className="h-64 mb-12"
            />
        </div>
    );
}
