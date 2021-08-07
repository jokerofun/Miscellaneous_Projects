# coding: utf-8
import cherrypy
from .database import Database_cl
from .view import View_cl
from .listType import ListType

# ----------------------------------------------------------


class Application_cl(object):
    # ----------------------------------------------------------
    
    # -------------------------------------------------------
    def __init__(self):
        # -------------------------------------------------------
        self.db_o = Database_cl()
        self.view_o = View_cl()
        self.listType_o = ListType()

    @cherrypy.expose
    # -------------------------------------------------------
    def nav(self):
        # -------------------------------------------------------
        listType = self.listType_o.getListType()
        if(listType == 1):
            return self.index()
        elif(listType == 2):
            return self.alt()
    @cherrypy.expose
    # -------------------------------------------------------
    def index(self):
        # -------------------------------------------------------
        self.listType_o.setListType(1)
        return self.createList_p()

    @cherrypy.expose
    # -------------------------------------------------------
    def alt(self):
        # -------------------------------------------------------
        self.listType_o.setListType(2)
        return self.createList_p()

    @cherrypy.expose
    # -------------------------------------------------------
    def add(self):
        # -------------------------------------------------------
        return self.createForm_p()

    # -----------------------------
    @cherrypy.expose
    def delete(self, id):
        self.db_o.delete_px(id)
        raise cherrypy.HTTPRedirect('/')

# -------------------------------------

    @cherrypy.expose
    # -------------------------------------------------------
    def edit(self, id_spl):
        # -------------------------------------------------------
        return self.createForm_p(id_spl)

    @cherrypy.expose
    # -------------------------------------------------------
    def save(self, id_spa, name1_spa, vorname1_spa, matrnr1_spa, semester1_spa,name2_spa, vorname2_spa, matrnr2_spa, semester2_spa):
        # -------------------------------------------------------
        id_s = id_spa
        data_a = [name1_spa, vorname1_spa, matrnr1_spa, semester1_spa,name2_spa, vorname2_spa, matrnr2_spa, semester2_spa]
        if id_s != "None":
            self.db_o.update_px(id_s, data_a)
        else:
            self.db_o.create_px(data_a)
        return self.createList_p()

    @cherrypy.expose
    # -------------------------------------------------------
    def default(self, *arguments, **kwargs):
        # -------------------------------------------------------
        msg_s = "unbekannte Anforderung: " + \
            str(arguments) + \
            ' ' + \
            str(kwargs)
        raise cherrypy.HTTPError(404, msg_s)
    default.exposed = True

    # -------------------------------------------------------
    def createList_p(self):
        # -------------------------------------------------------
        data_o = self.db_o.read_px()
        return self.view_o.changeList_px(data_o, self.listType_o)

    # -------------------------------------------------------
    def createForm_p(self, id_spl=None):
        # -------------------------------------------------------
        if id_spl != None:
            data_o = self.db_o.read_px(id_spl)
        else:
            data_o = self.db_o.getDefault_px()
        return self.view_o.createForm_px(id_spl, data_o)

# EOF
