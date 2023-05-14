var host = "https://catchlab-api.smicee.com";

const V1API = {
    'get_login': host + '/api/auth/token',
    'verify_token': host + '/api/auth/token/verify',
    // 'get_item_count': host + '/blogs/dashboard/count/',

    'get_slider_images': host + '/api/home/slider',
    'create_slider_image': host + '/api/home/slider/create',
    'delete_slider_image': host + '/api/home/slider/delete/',
    
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

    'get_case_list': host + '/api/case/',
    'create_case': host + '/api/case/create',
    'get_case_details': host + '/api/case/detail/',
    'edit_case': host + '/api/case/update/',
    'delete_case': host + '/api/case/delete/',

    'get_review_list': host + '/api/reviews/',
    'create_review': host + '/api/reviews/create',
    'delete_review': host + '/api/reviews/delete/',

    'get_team_list': host + '/api/team/',
    'create_team': host + '/api/team/create',
    'edit_team': host + '/api/team/update/',
    'delete_team': host + '/api/team/delete/',

    'get_client_list': host + '/api/client/',
    'create_client': host + '/api/client/create',
    'edit_client': host + '/api/client/update/',
    'delete_client': host + '/api/client/delete/',

    'get_site_settings': host + '/api/home/settings/',
    'create_site_settings': host + '/api/home/settings/create',
}

export default V1API;