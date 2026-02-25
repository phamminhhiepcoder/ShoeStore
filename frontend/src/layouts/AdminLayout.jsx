import React, { useEffect } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import LeftAdmin from "../components/LeftAdmin";
import RightAdmin from "../components/RightAdmin";

const AdminLayout = ({ children }) => {
    useEffect(() => {
        const cssLinks = [
            "/assets_admin/vendors/styles/core.css",
            "/assets_admin/vendors/styles/icon-font.min.css",
            "/assets_admin/plugins/datatables/css/dataTables.bootstrap4.min.css",
            "/assets_admin/plugins/datatables/css/responsive.bootstrap4.min.css",
            "/assets_admin/vendors/styles/style.css",
            "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css",
            "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
        ];

        cssLinks.forEach((href) => {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = href;
            document.head.appendChild(link);
        });

        const jsScripts = [
            "/assets_admin/vendors/scripts/core.js",
            "/assets_admin/vendors/scripts/script.min.js",
            "/assets_admin/vendors/scripts/process.js",
            "/assets_admin/vendors/scripts/layout-settings.js",
            "/assets_admin/plugins/datatables/js/jquery.dataTables.min.js",
            "/assets_admin/plugins/datatables/js/dataTables.bootstrap4.min.js",
            "/assets_admin/plugins/datatables/js/dataTables.responsive.min.js",
            "/assets_admin/plugins/datatables/js/responsive.bootstrap4.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js",
        ];

        jsScripts.forEach((src) => {
            const script = document.createElement("script");
            script.src = src;
            script.async = false;
            document.body.appendChild(script);
        });

        // === Favicon ===
        const favicons = [
            { rel: "apple-touch-icon", sizes: "180x180", href: "/assets_admin/vendors/images/apple-touch-icon.png" },
            { rel: "icon", type: "image/png", sizes: "32x32", href: "/assets_admin/vendors/images/favicon-32x32.png" },
            { rel: "icon", type: "image/png", sizes: "16x16", href: "/assets_admin/vendors/images/favicon-16x16.png" },
        ];

        favicons.forEach((f) => {
            const link = document.createElement("link");
            link.rel = f.rel;
            if (f.type) link.type = f.type;
            if (f.sizes) link.sizes = f.sizes;
            link.href = f.href;
            document.head.appendChild(link);
        });

        return () => {
            document.querySelectorAll("link[rel='stylesheet'], script").forEach((el) => {
                if (cssLinks.includes(el.href) || jsScripts.includes(el.src)) {
                    el.remove();
                }
            });
        };
    }, []);

    return (
        <div>
            <HeaderAdmin />
            <LeftAdmin />
            <RightAdmin />
            <div className="main-container admin-layout flex min-h-screen w-full bg-gray-100">
                {children}
            </div>

        </div>
    );
};

export default AdminLayout;
