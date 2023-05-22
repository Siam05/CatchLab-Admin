var host = "https://catchlab-api.smicee.com";

const V1API = {
    'get_login': host + '/api/auth/token',
    'verify_token': host + '/api/auth/token/verify',
    
    'get_service_list': host + '/api/services/',
    'create_service': host + '/api/services/create',
    'get_service_details': host + '/api/services/detail/',
    'edit_service': host + '/api/services/update/',
    'delete_service': host + '/api/services/delete/',

    'get_category_list': host + '/api/category/',
    'create_category': host + '/api/category/create',
    'get_category_details': host + '/api/category/detail/',
    'edit_category': host + '/api/category/update/',
    'delete_category': host + '/api/category/delete/',

    'get_project_list': host + '/api/projects/',
    'create_project': host + '/api/projects/create',
    'get_project_details': host + '/api/projects/details/',
    'edit_project': host + '/api/projects/update/',
    'delete_project': host + '/api/projects/delete/',

    'get_client_list': host + '/api/client/',
    'create_client': host + '/api/client/create',
    'edit_client': host + '/api/client/update/',
    'delete_client': host + '/api/client/delete/',

    'get_job_positions': host + '/api/jobs/position',
    'create_job_position': host + '/api/jobs/position/create',
    'get_job_position_by_id': host + '/api/jobs/position/',
    'edit_job_position': host + '/api/jobs/position/edit/',
    'delete_job_position': host + '/api/jobs/position/delete/',

    'get_job_applications': host + '/api/jobs/applications',
    'delete_job_application': host + '/api/jobs/applications/delete/',

    'get_site_settings': host + '/api/home/settings/',
    'create_site_settings': host + '/api/home/settings/create',
}

export default V1API;