import { useEffect } from "react";

const AuthLayout = ({ children }) => {
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

        const jsScripts = [
            "https://code.jquery.com/jquery-3.6.0.min.js",
            "https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js",
            "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js",
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

        cssLinks.forEach(href => {
            if (!document.querySelector(`link[href="${href}"]`)) {
                const link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = href;
                document.head.appendChild(link);
            }
        });

        jsScripts.forEach(src => {
            if (!document.querySelector(`script[src="${src}"]`)) {
                const script = document.createElement("script");
                script.src = src;
                script.async = false;
                document.body.appendChild(script);
            }
        });

        return () => {
            cssLinks.forEach(href => {
                const link = document.querySelector(`link[href="${href}"]`);
                if (link) link.remove();
            });

            jsScripts.forEach(src => {
                const script = document.querySelector(`script[src="${src}"]`);
                if (script) script.remove();
            });
        };
    }, []);

    return (
        <div className="login-page">
            {/* CONTENT */}
            <div className="login-wrap d-flex align-items-center flex-wrap justify-content-center">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
