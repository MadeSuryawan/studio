// src/app/test-fouc/page.tsx
"use client";

import { useState } from "react";

/**
 * Test page to verify FOUC (Flash of Unstyled Content) fix for footer
 * This page allows testing the footer behavior during page reloads
 */
export default function TestFOUCPage() {
    const [reloadCount, setReloadCount] = useState(0);

    const handleReload = () => {
        setReloadCount(prev => prev + 1);
        // Force a hard reload to test FOUC
        window.location.reload();
    };

    const handleSoftReload = () => {
        setReloadCount(prev => prev + 1);
        // Simulate navigation to test client-side transitions
        window.history.pushState({}, '', window.location.href);
        window.location.href = window.location.href;
    };

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">
                    FOUC Test Page
                </h1>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">
                        Footer FOUC Testing
                    </h2>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        This page is designed to test the Flash of Unstyled Content (FOUC) fix 
                        for the footer component. Use the buttons below to test different reload scenarios.
                    </p>
                    
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium mb-2">Test Instructions:</h3>
                            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                <li>Scroll to the bottom of the page to see the footer</li>
                                <li>Click "Hard Reload" to test server-side rendering behavior</li>
                                <li>Watch for any flash or sudden appearance of the footer</li>
                                <li>The footer should fade in smoothly without any visual jumps</li>
                                <li>Test with different network speeds (throttle in DevTools)</li>
                            </ol>
                        </div>
                        
                        <div className="flex gap-4">
                            <button
                                onClick={handleReload}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                            >
                                Hard Reload (Test FOUC)
                            </button>
                            
                            <button
                                onClick={handleSoftReload}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                            >
                                Soft Reload
                            </button>
                        </div>
                        
                        <div className="text-sm text-gray-500">
                            Reload count: {reloadCount}
                        </div>
                    </div>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8">
                    <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                        What to Look For:
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                        <li>Footer should not suddenly "pop" into view</li>
                        <li>Footer should fade in smoothly with opacity transition</li>
                        <li>No layout shifts or jumps during page load</li>
                        <li>Consistent behavior across different reload types</li>
                        <li>Skeleton should appear briefly before real footer loads</li>
                    </ul>
                </div>
                
                {/* Spacer content to ensure footer is below the fold */}
                <div className="space-y-8">
                    {Array.from({ length: 10 }, (_, i) => (
                        <div key={i} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
                            <h3 className="text-lg font-medium mb-2">
                                Content Section {i + 1}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                This is placeholder content to ensure the footer appears below the fold.
                                The footer should load smoothly without any flash of unstyled content.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                                tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                    ))}
                </div>
                
                <div className="mt-12 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <h3 className="font-medium text-green-800 dark:text-green-200 mb-2">
                        Success Criteria:
                    </h3>
                    <p className="text-sm text-green-700 dark:text-green-300">
                        If the footer appears smoothly without any sudden flashes or layout shifts,
                        the FOUC fix is working correctly. The footer should fade in gracefully
                        after the page hydration is complete.
                    </p>
                </div>
            </div>
        </div>
    );
}
